# order-bot

## A Slack Bot for ordering!

This project is to develop a interface agnotic system that can intepret user input and react to it. For the purpose of a pilot project, this setup works as a Slack Bot that can order drinks from a coffe shop.

## Getting started

1. Clone this repo.
2. `npm install`.
4. Create a [Slack Bot](https://my.slack.com/services/new/bot) and make sure to add it to the appropriate Workspace.
5. Under **Basic Information** select **Bots** from the **Add features and functionality** section.
6. Change your bot's Display name and default username.
7. Obtain a Bot User OAuth Access token from the bot's OAuth &amp; Permissions section (e.g. https://api.slack.com/apps/[UNIQUE_ID]/oauth?) and copy it.
8. Paste and replace the `TOKEN` value with this OAuth token in `src/slackbot_secrets.example.js` and then rename that file to `src/slackbot_secrets.js` (do not share the token so don't publish this file online). You can, of course, change this method of saving senstive information to whatever you prefer.
9. Create your own groups of questions that a user can ask that are handled by a JavaScript method in `src/AI.js`.

## On first-run of your bot

You'll need to obtain the unique `bot_id` of your bot and change the `ID` value in `src/slackbot_secrets.js` to this ID. Unless something changes with the Slack API, this `bot_id` will be a 9 character alphanumeric code that starts with the letter `B`. e.g. `BX0X000XX`. 

1. Uncomment the line `//console.log(data);` in `src/Bot.js`.
2. run your project with `npm start`.
3. Send a message to the bot from Slack and take a look at your terminal's output for an object like the following:

```json
{ 
  text: 'Good evening.',
  username: 'Lucy\'s Coffee',
  icons: { 
    emoji: ':robot_face:',
    image_64: 'https://a.slack-edge.com/37d58/img/emoji_2017_12_06/apple/1f916.png' 
  },
  bot_id: 'BX0X000XX',
  type: 'message',
  subtype: 'bot_message',
  team: 'TXX0XX0X0',
  channel: 'DXXXX00X0',
  event_ts: '1543201271.002700',
  ts: '1543201271.002700' 
}
```

`bot_id: 'BX0X000XX'` is what you're after. At the time of writing this, I'm not sure of any other way to obtain the ID other than through this method (suggestions welcome).

### Why is getting this bot_id important?

At the time of writing this, this software is not meant to react to anything but the user. Reacting to itself (it'll try to handle every type of event in Slack that the bot is attached to) could result in logic loops and this is the best way I can think of for preventing this type of unwanted behaviour (for now - please feel free to give suggestions).
