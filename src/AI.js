const C = require('./config');
const Logger = require('./Logger');
const SlackBot = require('slackbots');
const bot = new SlackBot({
    token: C.BOT_TOKEN,
    name: C.BOT_NAME
});

const AI = (function(){
  const queryResponses = {
    respondWithGreeting: [
        'hi',
        'hello',
        'yo',
        'hey',
        'bonjour',
        'wassup',
        'howdy'
    ],
    respondWithHoursOfOperation: [
        'hours',
        'what are your hours of operation',
        'when do you open',
        'are you open'
    ],
    respondWithHelp: [
        'help',
        'what can you do'
    ]
  }

  return {
    init: function(){
      Logger.log(C.BOT_FRIENDLY_NAME + '\'s AI is running ✓');
    },
    handleDirectMessage: function(message) {
      Logger.log(`${C.BOT_FRIENDLY_NAME} received a direct message: "${message}"`);
      let simpleMessage = AI.simplifyQuery(message);
      Logger.log(`${C.BOT_FRIENDLY_NAME} simplified query to: "${simpleMessage}"`);

      let decision = 'respondWithMisunderstanding';

      Object.entries(queryResponses).forEach(([key, val]) => {
          queryResponses[key].forEach((item) => {
              if (simpleMessage === item) {
                  decision = key;
              }
          });
      });
      Logger.log(`${C.BOT_FRIENDLY_NAME} decided to respond using logic from: ${decision}`);
      AI.handleDecision(decision,simpleMessage);
    },
    simplifyQuery: function(message) {
      return message.replace(/[?!]/g,'').toLowerCase().trim();
    },
    handleDecision: function(decision,message) {
      switch(decision) {
        case 'respondWithMisunderstanding': {
          AI.respondWithMisunderstanding(message);
          break;
        }
        case 'respondWithGreeting': {
          AI.respondWithGreeting()
          break;
        }
        case 'respondWithHoursOfOperation': {
          AI.respondWithHoursOfOperation()
          break;
        }
        case 'respondWithHelp': {
          AI.respondWithHelp()
          break;
        }
      }
    },
    respondWithMisunderstanding: function(query='') {
      const params = {
          icon_emoji: C.BOT_EMOJI
      };
      Logger.misunderstanding(`${C.BOT_FRIENDLY_NAME} did not understand a user's query of "${query}"`);
      bot.postMessageToUser('jrundell', `I'm sorry, but I can't help with that yet.`, params);
    },
    respondWithGreeting: function(replyToName='') {
      const params = {
          icon_emoji: C.BOT_EMOJI
      };
      bot.postMessageToUser('jrundell', `Yo ${replyToName}!`, params);
    },
    respondWithHoursOfOperation: function() {
      const params = {
          icon_emoji: C.BOT_EMOJI
      };
      bot.postMessageToUser('jrundell', `${C.COMPANY_NAME_PLURAL} hours this week are:\nMon - Thurs: 7:30 am - 4 pm\nFri: 7:30 am - 2:30 pm`, params);
    },
    respondWithHelp: function() {
      const params = {
          icon_emoji: C.BOT_EMOJI
      };
      bot.postMessageToUser('jrundell', `Current commands I am familiar with are:\n\`hours\` - I will give you the store hours of ${C.COMPANY_NAME}.`, params);
    }
  }
})();

const respondWithHoursOfOperation = `console.log('foo');`;

module.exports = AI;
