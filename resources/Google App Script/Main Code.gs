/* AUTHOR: David Verweij
* VERSION: 3 (July 2020)
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*
* @OnlyCurrentDoc Limits the script to only accessing the current sheet.
*/


/**
* Make the 'Home Tab' active when opening the spreadsheet
*/
function onOpen() {
  let doc = SpreadsheetApp.getActiveSpreadsheet();
  doc.setActiveSheet(doc.getSheetByName(variables.sheetNames.home));
}


/**
* Changes were made to the Sheet. I.e. new data came in.
*
* @param {Event} e - The event object containing details
*/
function somethingChanged(e){

  switch(e.changeType){

      // (A) One new row of data came in.
    case "INSERT_ROW": {
      let doc = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = doc.getSheetByName(variables.sheetNames.dataIn);
      let newRows = sheet.getLastRow();

      // (1) Get the data and store them elsewhere (to prevent API 2000 row limit)
      if (newRows > 0){
        let lastColumn = sheet.getLastColumn();
        let values = sheet.getRange(1, 1, newRows, lastColumn).getValues();
        let targetSheet = doc.getSheetByName(variables.sheetNames.dataStored);
        let ruleActivated = false;
        let timeNow = Math.floor((new Date()).getTime()/1000);

        values.forEach(function(row, index) {
          // (2) Activate 'rules' where applicable
          if (activateRule(row[0], doc, timeNow)) {
            ruleActivated = true;

            // Logging
            if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "Rule Activated: " + row[0], true);
          }
          // (3) Store data for future reference
          prependRow(targetSheet, row, true);
        });

        // (4) When a rule was activated, let the phone know
        if (ruleActivated) pingDatabase(timeNow);

        // (5) Clear all confirmed data
        sheet.deleteRows(1, newRows);
      }
      break;
    }
      // (B) The user edited the spreadsheet.
    case "EDIT": {
      let doc = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = doc.getSheetByName(variables.sheetNames.home);

      // (1) Get all data from the Home sheet
      let values = sheet.getDataRange().getValues();

      // (2) Run through all rows starting at the first rule row, and check if it being tested
      values.forEach(function(row, index){
        if (index >= variables.rows.firstRule){

          // (3) if the rule tickbox is TRUE, add the instruction (assuming this the somethingChanged(e) triggered for each tickbox change)
          if (row[variables.colums.test.index]){
            let timeNow = Math.floor((new Date()).getTime()/1000);
            let instruction = {
              backgrounds : doc.getSheetByName(row[colums.background.index]).getRange(variables.ranges.background).getBackgrounds(),
              duration    : 20,
              timestamp   : timeNow,
            };
            addPhoneInstruction([instruction], timeNow);
            pingDatabase(timeNow);

            // (4) Uncheck the checked checkbox
            sheet.getRange(index+1,variables.columns.test.index+1,1,1).uncheck();

            // (5) Inform the user of the action through a popup
            let ui = SpreadsheetApp.getUi();
            ui.alert('Rule ' + (index + 1 - variables.rows.firstRule) + ' is now being tested for 20 seconds.');

            // Logging
            if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "Testing Rule " + (index + 1 - variables.rows.firstRule), true);
          }
        }
      });
      break;
    }
    default:
      // for all types, see https://developers.google.com/apps-script/guides/triggers/events#change
      // TODO: if a sheet is deleted, check if:
      //  (1) all sheets needed are here
      //  (2) 1. Incoming Data is the first sheet
      //  (3) Update all background sheets to get an accurate representation
      break;
  }
}


/**
* Check if the conditions trigger a set rule.
*
* @param {String} name - The name of the incoming data trigger
* @param {Google Doc} doc - The Google Sheet document to search in
*/
function activateRule(name, doc, timestamp){
  let triggered = false;
  let instructions = [];

  // (1) Get all data from the Home sheet
  let values = doc.getSheetByName(variables.sheetNames.home).getDataRange().getValues();

  // (2) Run through all rows starting at the first rule row, and check if it complies
  values.forEach(function(row, index){
    if (index >= variables.rows.firstRule){

      // (3) if the name corresponds, AND it is 'activated', trigger a phone update
      if (row[variables.colums.rule.index] == name && row[variables.colums.active.index]){
        let instruction = {
          backgrounds : doc.getSheetByName(row[colums.background.index]).getRange(variables.ranges.background).getBackgrounds(),
          duration    : calcDuration(row[variables.colums.duration.index], row[variables.columns.durationUnit.index]),
          timestamp   : timestamp,
        };
        instructions.push(instruction);
        triggered = true;
      }
    }
  });

  addPhoneInstruction(instructions, timestamp);
  return triggered;
}

/**
* Add another instruction for the phone, and remove old uncollected triggers
* Currently stores this in script properties. Alternative: stored in the sheet cells.
*
* @param {Array} instructions - An array of instructions to add. See doGet() for the structure
* @param {Integer} timestamp - The current time to compare todos with
*/
function addPhoneInstruction(instructions, timestamp){

  // (1) Get all current triggers
  let todo = JSON.parse(script.getProperty("todo"));

  // (2) Remove past and uncollected triggers
  todo.forEach(function(instruction, index, thisObject){
    if ((instruction.timestamp + instruction.duration) < timestamp) thisObject.splice(index,1);
  });

  // (3) Add the new triggers, and store all in the script properties
  script.setProperty("todo", JSON.stringify(todo.concat(instructions)));
}

/**
* The webapp was contacted (HTTPS)
*
* @param {Event} e - The event object containing details
*
* Returns an object of instructions, similar to:
*
* {
*   result: 'success',
*   todo: [               // array of object representing backgrounds to show
*      {
*        backgrounds: [   // a grid of backgrounds colours to show
*            [#000000, #000000, #000000, #000000],
*            [#000000, #000000, #000000, #000000],
*            // etc
*        ],
*        duration: 18000        // duration of showing in seconds
*        triggered: 1595432159  // (unix) timestamp of when it was triggered
*      },
*      {
*        backgrounds: [
*            [#000000, #000000, #000000, #000000],
*            [#000000, #000000, #000000, #000000],
*            // etc
*        ],
*        duration: 18000
*        triggered: 1595432159  // (unix) timestamp of when it was triggered
*      },
*      // etc
*   ],
*   databasePing: 'userIdxxx'  // optional, if requested
* }
*/

function doGet(e) {
  // (1) Prevent simultaneuous access to this script, 10 seconds before concedig defeat
  var lock = LockService.getPublicLock();
  lock.waitLock(10000);

  try {
    if (typeof(e) != 'undefined') {
      let doc = SpreadsheetApp.openById(script.getProperty("key")); // getting sheet by ID instead of 'activeSpreadsheet()'
      let origin = e.parameter.origin;
      let data = e.parameter.data;
      let result = {"result" : "error - wrong use of the webapp"};  // prepare reply

      // the GET request's body must contain 'origin' (= phone) and a data parameter
      if (typeof(origin) != "undefined" && typeof(data) != "undefined" && origin == "phone"){

        // (2) Update connection status on the home sheet
        updatePhoneStatus(doc, "Phone seen on: " + (new Date()).toLocaleDateString('en-GB', { timeZone: 'UTC' }));
        result.result = "success";

        // If requested, send back the database id
        if (data == "database"){
          result.databasePing = script.getProperty("userID");
        }

        // (3a) Add backgrounds that need 'representing'. This could be empty. The phone will keep track of all past commands (over overlap them)
        // Note: in this implementation, the todo's will keep piling up until retreived. This needs to be addressed in the future.
        result.todo = script.getProperty("todo");
        // (3b) Clear the list of instructions
        script.setProperty("todo", '[]');

        // Logging history
        if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "Phone retreived instructions ", true);
      }
    }
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
  catch(e){
    console.log(e);
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": e})).setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock(); //release lock
  }
}

/**
* Send the background to the phone to preview the result.
*/
function testBackground() {
  let doc = SpreadsheetApp.getActiveSpreadsheet();
  let now = Math.floor((new Date()).getTime()/1000);
  let instruction = {
    backgrounds : doc.getActiveSheet().getRange(variables.ranges.background).getBackgrounds(),
    duration    : 20,
    timestamp   : now,
  };
  addPhoneInstruction([instruction]);
  pingDatabase();       // ping the database, so the phone can retreive the new instruction

  //Logging History
  if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "Testing " + name, true);
}

/**
* Add another rule to the home page
*/
function addRule() {
  let doc = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = doc.getSheetByName(variables.sheetNames.home);
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  sheet.getRange(variables.rows.firstRyle, 1, 1, lastColumn).copyTo(sheet.getRange(lastRow+2, 1, 1, lastColumn));

  // Logging history
  if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "New Rule created", true);
}

/**
* Add another background to the sheets
*/
function addBackground() {
  let doc = SpreadsheetApp.getActiveSpreadsheet();
  let sheets = doc.getSheets();

  // (1) Find all the background sheets, trim and search for the largets 'number'
  let backgrounds = findSheets(sheets, variables.sheetNames.backgrounds);
  let newest = Math.max(...(backgrounds).map(x => parseInt(x.replace(variables.sheetNames.backgrounds, "")))) + 1;
  let template = doc.getSheetByName(backgrounds[0]);
  let newName = name + " " + newest;

  // (2) Create a new background based on the first, and update the list of backgrounds
  template.copyTo(doc).setName(newName);
  backgrounds.push(newName);
  doc.getRange(variables.A1Notations.backgrounds + (backgrounds.length + 1)).setValues(backgrounds.map(x => [x]));

  // Logging History
  if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "New Background created: " + newName, true);
}

/**
* Sets up the script to connect to the database anonymously,
* and start listening to changes to the sheet (for incoming data).
*/
function setup() {
  let doc = SpreadsheetApp.getActiveSpreadsheet();

  // (1) Store the ID to this spreadsheet in this script
  script.setProperty("key", doc.getId());

  // (2) Create a new anonymous user in the Firestore Database
  // newAnonymousUser();

  // (3) Install a trigger that listen to spreadsheet changes by the user (e.g. adding/removing sheets or deleting columns)
  /*ScriptApp.newTrigger("somethingChanged")
  .forSpreadsheet(doc)
  .onChange()        // onEdit() is not called if the API makes changes, onChange() is - but it is limited (no event data)
  .create();
  */

  // (4) Update system status
  updatePhoneStatus(doc, "Awaiting phone connection...");

  // Logging History
  if (activeLogging) prependRow(doc.getSheetByName(variables.sheetNames.logs), "Setup. New Anonymous User Created", true);
}
