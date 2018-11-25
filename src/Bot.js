const SlackBot = require('slackbots');
const Logger = require('./Logger');
const AI = require('./AI');

const Bot = (function(){
  const CONFIG = {
    BOT_TOKEN: 'xoxb-2184034487-464264402385-um4Okes6DTaopoorwUP4KEj7',
    BOT_NAME: 'order-bot',
    BOT_FRIENDLY_NAME: 'Order Bot',
    BOT_ID: 'BDNNQPXUK',
    BOT_EMOJI: ':robot_face:',
    COMPANY_NAME: 'Lucy\'s Coffee',
    COMPANY_NAME_PLURAL: 'Lucy\'s Coffee\'s'
  };
  const slackbot = new SlackBot({
    token: CONFIG.BOT_TOKEN,
    name: CONFIG.BOT_NAME
  });

  const slackbot_params = {
    icon_emoji: CONFIG.BOT_EMOJI
  };

  slackbot.on('start', () => {
    Logger.log(`${CONFIG.BOT_FRIENDLY_NAME} running ✓`);
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

  slackbot.on('error', (err) => Logger.error(err));

  slackbot.on('message', (data) => {
    if (data.bot_id === CONFIG.BOT_ID) {
      return;
    }
    if (data.type !== 'message') {
      return;
    }

    /*
    C, it's a public channel
    D, it's a DM with the user
    G, it's either a private channel or multi-person DM
    */
    if (data.channel.charAt(0) === 'D') {
      let aiResponse = AI.handleDirectMessage(data.text);
      let userName = Bot.getSlackUsername(data.user);
      slackbot.postMessageToUser(userName, aiResponse, slackbot_params);
    }

  });

  return {
    init: function(){

    },
    getSlackUserInfo: function(slackUniqueId) {
      let allUsers = slackbot.getUsers()._value.members;
      let userInfo = null;
      allUsers.forEach(element => {
        if (element.id === slackUniqueId) {
          userInfo = element;
        }
      });

      return userInfo;
    },
    getSlackUsername: function(slackUniqueId){
      let userInfo = Bot.getSlackUserInfo(slackUniqueId);
      return userInfo.name;
    }
  }
})();

module.exports = Bot;
