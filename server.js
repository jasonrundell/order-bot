const SlackBot = require('slackbots');
const axios = require('axios');
const C = require('./src/config');
const App = require('./src/App');
const Logger = require('./src/Logger');
const AI = require('./src/AI');

const bot = new SlackBot({
  token: C.BOT_TOKEN,
  name: C.BOT_NAME
});

bot.on('start', () => {
    App.init();
    AI.init();
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    //bot.postMessageToChannel('orderbot-test-channel', `Order Bot is active. Awaiting orders ... ${C}`, params);

    // define existing username instead of 'user_name'
    //bot.postMessageToUser('jrundell', 'Hello from Order Bot', params);

    // If you add a 'slackbot' property,
    // you will post to another user's slackbot channel instead of a direct message
    //bot.postMessageToUser('orderbot', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });

    // define private group instead of 'private_group', where bot exist
    //bot.postMessageToGroup('private_group', 'meow!', params);
});

bot.on('error', (err) => Logger.error(err));

bot.on('message', (data) => {
  if (data.bot_id === C.BOT_ID) {
    return;
  }
  if (data.type !== 'message') {
    return;
  }
  console.log(data);
  /*
  C, it's a public channel
  D, it's a DM with the user
  G, it's either a private channel or multi-person DM
  */
  if (data.channel.charAt(0) === 'D') {
    let userId = 'jrundell';
    AI.handleDirectMessage(userId,data.text);
  }

});
