---
layout: default
---

# Turn an Unused Smartphone Into a Smart Display


![alt text](assets/images/sunshine.jpg "text1")

Do you have an (old) unused smartphone? Turn it into a smart display using Google Sheets and some pen and paper, by following this easy step-by-step tutorial.

When you finished the tutorial, you will have turned your phone into 'smart display'. The screen of your phone will then change based on some data that you choose. For example, the screen could turn _blue when you receive an email_ or _green when your favourite website publishes a new blog post_. Of course, just showing colours doesn't tell you what it means - that's where some pen and paper come in handy. With a drawing placed in front of the phone you give meaning to the colours. Since we can 'split' the screen into multiple areas, you can even show multiple things at the same time. For example, you could let the _left side turn blue when it will rain_, **and** let the _right side turn yellow when the temperature is high_ (see also the image at the top). Since your choice of data and your creativity with drawing allows for countless possibilities, we just can't imagine what you will use your smart display for!

## Supplies
- A smartphone that can connect to your Wi-Fi (_preferably one you don't need for a while_)
- Some pen and paper
- A computer/laptop to set things up
- A [Google account](https://myaccount.google.com/){:target="_blank"} (_for using Google Sheets_)
- An [IFTTT.com](https://www.ifttt.com/){:target="_blank"} account (_for connecting it to data_)

## Step 1: Copy the Google Sheet


## 


### Step 1: Prepare the 'obsolete' phone
You can follow along with a phone of any age, as long as it can connect to the Wi-Fi, can be charged and has a screen (but it can be cracked!). In any case, since we are connecting it to the Internet, we need to do ensure some level of security.

[keeping your phone turned on all the time](https://www.phonegrown.site/#more-sust)
[security settings phone](https://www.phonegrown.site/#more-safe-phones)

As we want the phone to visibly respond to incoming data, we need to keep the screen awake. On Android phones, we need to enable `developer` options by tapping 7 times on the `build number` in *Settings > About Phone*. Then in `Developer Options` turn on **Stay Awake when charging**. For iOS devices, we can set the **Auto-Lock** to `Never`, which you can find in *Settings > Display & Brightness*. See more info how to do this for [Android](https://www.howto-connect.com/how-to-stay-awake-phone-screen-while-charging-on-android/) or [iOS](https://forums.tomsguide.com/faq/how-to-change-the-auto-lock-time-in-ios-11.19693/).

All that is left is to keep the charger plugged in at all times. Where possible, disable the `Adaptive brightness` (often in Settings > Display) and set the brightness to 100%. This will help in the visibility of the screen when we put some paper in front of it. Of course, keeping your phone plugged in and screen on full brightness consumes energy - though no more than 2kWh (or €1/£1) per year. Click the arrow below to read more.

**<details><summary>More on the power consumption</summary>**
<i>
> Keeping your screen on all the time will increase the power usage of your phone. In addition to that, the processor is not going to sleep. This is different from the modern screensavers on phones, as they use processing power and energy intelligently. Unfortunately, since we use older phones and a website instead of an app, we cannot use this approach. Instead, this tutorial requires you to keep the phone on a charger, similar to how you would Chargers that are not charging use [almost no energy](https://www.howtogeek.com/231886/tested-should-you-unplug-chargers-when-youre-not-using-them/). However, leaving your phone on the charger at all times is [not the best treatment](https://www.digitaltrends.com/mobile/expert-advice-on-how-to-avoid-destroying-your-phones-battery/) for the longevity of your battery. This should be fine when using an older, obsolete, phone, but might not be best if you are using a modern phone for this tutorial in the long run.
>
> **A rough calculation (2kWh, < €1/£1 per year)**\
Let's take a 'new' Samsung Galaxy S6 (2015) with a battery of 2550 mAH (3.85V). If the phone would be fully drained (and charged) each day, it would take up to 5.5 Wh, or 2 kWh per year. With a current average energy cost of [less than €0,30 / £0,30](https://ec.europa.eu/eurostat/statistics-explained/index.php/Electricity_price_statistics) per kWh, it would cost no more than one euro or pound each year.

</i></details>


## Step 2: Copy the Google Sheet and set it up  
Rather than using specially-built apps, we will set up a connection with data sources and determine how the phone's screen responds all through a Google Sheet. This should give you full control and visibility of what is going on 'behind the scenes', and we think the spreadsheet layout should feel feel somewhat familiar. Even more so, because you will create a copy of the template below, no-one else but you will have access to the data and functionality you are about to set up.

&#9658; [Copy the Google Sheet from here]().

In your copy of the Google Sheet, a few additional steps are outlined. Follow these and your phone will soon visibly respond to input from 'outside'!


## Step 3: Connect your 'old' phone
>This step is also mentioned within your copy of the Google Sheet

On your old phone, visit [phonegrown.site/phone](http://www.phonegrown.site/phone). This website (which is hosted on the open source platform GitHub) presents you with a input field. Enter the 'ID' as shown in the Google Sheet and press connect. You should see a confirmation on the phone as well as in the Google Sheet.

Test your setup by clicking the tick box `☐` in the *Test Rule* in the Google Sheet. Change the *Area of the Phone* and *Color* and see how your phone changes along. Keep this Google Sheet handy, as we will come back to it in the next step.

## Step 4: Connect to data sources (using IFTTT.com)
There are various ways in which we could let your phone 'listen' to various data sources. In this tutorial, we will be using *If This, Then That ( [ifttt.com](http://www.ifttt.com) )*. If This Than That is a [service that connects numerous services and devices](https://help.ifttt.com/hc/en-us/articles/115010325748), allowing you to create certain interactive rules, called `Applets`. For example, *if* you come home, *then* it can automatically turn on the lights. Most rules are bound to specific products from specific brands (e.g. Gmail, Phillips), though there are a handful of *'generic'* sources, such as the weather or RSS feeds. Setting up any IFTTT 'applet' consists of two steps. Step 1 is setting up a 'trigger' of your choice. In our case, **Step 2 will be the same for any trigger you choose** - as we will be using IFTTT's provided Google Sheet integration to connect to our Google Sheet.

> If you follow this approach, you will need (to create) an IFTTT.com account. Some services require you to log in (often with your Google Account), and require access to some of your information. Read more on [IFTTT's privacy policy](https://ifttt.com/terms) and [Google's advice on third party access](https://support.google.com/accounts/answer/3466521).  

Following the example below will **set up your phone's screen to respond when there is a new article on the BBC** (or almost any other news or blog sites). It is a good starter to get to know the Google Sheet template, and enables you to comfortably explore different data sources on your own.

#### Part A: setting up the IFTTT 'Applet'

&#9658; [See a GIF/Video instruction here](resources/Images/Screen-Recording-IFTTT.gif).

1. Go to [ifttt.com/create](http://ifttt.com/create) and log in (create an account if needed).

1. Click on `[+] This`, find and choose `RSS`. Choose `New Feed Item`.

1. Enter a RSS compatible link of a website of your interest. In this example, we use `http://feeds.bbci.co.uk/news/world/europe/rss.xml` which 'triggers' for each new BBC article about Europe.

1. Click on `[+] That`, find and choose `Google Sheets`. Choose `Add row to spreadsheet`.

1. Adjust the **all three fields** to match the Phone Grown Google Sheet you copied **exactly**:

  - The `Spreadsheet name` should be exactly as the name of your copy, which you can find in the top left of the Google Sheet. If you haven't changed the name, it will be something like *Copy of Phone Grown ..*

 - We need to add a recognisable name in the `Formatted Row`, in order for the Phone Grown spreadsheet to recognise the data coming in. For example, add something like `RSS Feed`, followed by 3 vertical lines `|||` at the beginning of the `Formatted Row`, i.e. `RSS Feed ||| `.

 - The `Drive Folder Path` should be the entire path where you stored you copy of the Phone Grown spreadsheet. If you didn't 'move' the spreadsheet after you copied, it is most likely in the 'main' folder. If so, leave this field *empty*.

1. Copy all the text in the `Formatted Row`, and paste it somewhere safe. We will need this later.

1. Click `Create Action` and you are all set! You can change the name of this *Applet* if you want.

#### Part B: setting up the response of the phone
As with any data source, often the only way to see a result is to wait for it to do something - depending on the source this can take anywhere between seconds or days. Instead, we will do one more step that allows us to test your newly created IFTTT applet without waiting!

1. Open up your copy of the Phone Grown Google Sheet again. In the menu at the top, click '♻️📱 Phone Grown > 📈 New Data Source'. In the popup, paste your copy of the `Formatted Row` (from step 6 above). Click `Ok`.
> Although this step is technically not required, it sets the 'header' row for the incoming data. This makes it more clear what data is in each column, and allows us to test it as well.

1.  In the bottom section of the `Home` sheet, formulate a rule such that you get the visualisation you are interested. For example, you can turn half of the screen green for 1- minutes if there is a new article, or turn blue for ? Here are two examples:
| IF | this cell | (current data) | is | this value | THEN | turn this area of the phone | into this color |  | LIVE OUTPUT |
|-|-|-|-|-|-|-|-|-|-|
| if | J7 | (07/07/2020 16:35) | bigger than | =NOW()-"00:10" | then | top [D3:G6] | ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) |  | ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) |
| if | L7 | (test_EntryTitle) | contains | COVID | then | bottom [D7:G10] | ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) |  | ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) |

1.



# How does it work?

- link to GAS README
- link to Firebase README
- explainer,
- etc..

# Contribute

# License

# More examples please!

##### Other examples using IFTTT.com
<details>
<summary>Blink 5 times each hour</summary>

> Something about Date & Time trigger, additional rule

</details>

<details>
<summary>Turn blue when it is going to rain, yellow if it clears up</summary>

> Something about Date & Time trigger, additional rule

</details>


# Future vision
- smart use of energy (not screen always on), detecting movement (when is it relevant?), etc.
- explore reuse of other types of devices in a safe way

<a name="security"><sup>[1]</sup></a> For iOS devices this is roughly after 5 year since its release, for Android this is often shorter (~3 years). You can read more about [the safety of using older phones here](https://www.tomsguide.com/uk/us/old-phones-unsafe,news-24846.html?region-switch=1593506477).
