const SlackBot = require('slackbots');
const Logger = require('./Logger');
const AI = require('./AI');
const Slackbot_Secrets = require('./Slackbot_Secrets');

const Bot = (function(){
  const CONFIG = {
    BOT_NAME: 'order-bot',
    BOT_FRIENDLY_NAME: 'Order Bot',
    BOT_EMOJI: ':robot_face:',
    COMPANY_NAME: 'Lucy\'s Coffee',
    COMPANY_NAME_PLURAL: 'Lucy\'s Coffee\'s'
  };
  const slackbot = new SlackBot({
    token: Slackbot_Secrets.TOKEN
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
    Bot.handleMessage(data);
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
    },
    handleMessage: function(data){
      if (data.bot_id === Slackbot_Secrets.ID) {
        return;
      }
      if (data.type !== 'message') {
        return;
      }

      let messageType = data.channel.charAt(0);

      switch(messageType) {
        case 'D': {
          /* D, it's a DM with the user */
          Bot.handleDirectMessage(data.user,data.text);
          break;
        }
        case 'C': {
          /* C, it's a public channel */
          // todo
          break;
        }
        case 'G': {
          /* G, it's either a private channel or multi-person DM */
          // todo
          break;
        }
      }
    },
  handleDirectMessage: function(userId,userMessage){
      let aiResponse = AI.handleDirectMessage(userMessage);
      let userName = Bot.getSlackUsername(userId);
      slackbot.postMessageToUser(userName, aiResponse, slackbot_params);
    }
  };
})();

module.exports = Bot;
