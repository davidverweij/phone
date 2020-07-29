// secure 'local' storage of values repeatadly needed (persistent cross-sessions)
var script = PropertiesService.getScriptProperties();

// inside 'local' storage, we keep:
// - todo (an array of tasks keeping track of tests and tasks to inform the phone upon doGet())
//    e.g. [{background: [[],[],[]], duration: 60, timestamp: 1234567}, {...}]
// - userID (database userID)
// - auth_token (authentication token to acces the database)
// - refresh_token (to refresh the authentication token)
// - databaseLive (indicating if the database connection is seemingly viable)
// - onChangeID (trigger ID to prevent multiple instances)

// Turn off if you do not want to keep collecting logs
var activeLogging = true;

// Fixed variables:
var variables = {
  database : {
    signup     : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    refresh    : "https://securetoken.googleapis.com/v1/token?key=",
    url        : "https://firestore.googleapis.com/v1/projects/phone-grown/databases/(default)/documents/anonymous/",
    ID         : "AIzaSyCAHz6izwenF8F84SoQqRCekYhNeAe7u68"
  },
  sheetNames : {
    home       : "HOME",
    dataIn     : "[DATA] New",
    dataStored : "[DATA] History",
    logs       : "[LOGS]",
    backgrounds: "[BG]"
  },
  ranges : {
    background : "C3:G12",
    listOfBackgrounds: "F5:O5",
    status: "N2:N2"
  },
  columns : {
    active     : {'char':'O', 'index' : 14 },
    test       : {'char':'P', 'index' : 15 },
    rule       : {'char':'E', 'index' :  4 },
    background : {'char':'I', 'index' :  8 },
    duration   : {'char':'L', 'index' : 11 },
    durationUnit : {'char':'M', 'index' : 12 }
  },
  fixed :{
    firstRule  : 13,
    totalBackgrounds: 10,
  }
};
