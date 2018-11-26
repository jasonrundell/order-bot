const Logger = require('./Logger');

const AI = (function(){
  const CONFIG = {
    AI_NAME: 'AI'
  };

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
  };

  return {
    init: function(){
      Logger.log(`AI is running ✓`);
    },
    handleDirectMessage: function(message) {
      Logger.log(`${CONFIG.AI_NAME} received a direct message: "${message}"`);
      let simpleMessage = AI.simplifyQuery(message);
      Logger.log(`${CONFIG.AI_NAME} simplified query to: "${simpleMessage}"`);

      let decision = 'respondWithMisunderstanding';

      Object.entries(queryResponses).forEach(([key, val]) => {
          queryResponses[key].forEach((item) => {
              if (simpleMessage === item) {
                  decision = key;
              }
          });
      });
      Logger.log(`${CONFIG.AI_NAME} decided to respond using logic from: ${decision}`);
      return AI.handleDecision(decision,simpleMessage);
    },
    simplifyQuery: function(message) {
      return message.replace(/[?!]/g,'').toLowerCase().trim();
    },
    handleDecision: function(decision,message='') {
      switch(decision) {
        case 'respondWithMisunderstanding': {
          return AI.respondWithMisunderstanding(message);
        }
        case 'respondWithGreeting': {
          return AI.respondWithGreeting();
        }
        case 'respondWithHoursOfOperation': {
          return AI.respondWithHoursOfOperation();
        }
        case 'respondWithHelp': {
          return AI.respondWithHelp();
        }
      }
    },
    respondWithMisunderstanding: function(querySent='') {
      Logger.misunderstanding(`${CONFIG.AI_NAME} did not understand a user's query of "${querySent}"`);
      return 'I\'m sorry, but I can\'t help with that yet.';
    },
    respondWithGreeting: function() {
      let date = new Date();
      let currentHour = parseInt(date.getHours());
      let response = 'Hi.';

      if (currentHour < 11) {
        response = 'Good morning.';
      } else if (currentHour >= 11 && currentHour <= 17) {
        response = 'Good afternoon.';
      } else if (currentHour > 17) {
        response = 'Good evening.';
      }

      return response;

    },
    respondWithHoursOfOperation: function() {
      return `Our hours this week are:\nMon - Thurs: 7:30 am - 4 pm\nFri: 7:30 am - 2:30 pm`;
    },
    respondWithHelp: function() {
      return `Current commands I am familiar with are:\n\`hours\` - I will give you the store hours.`;
    }
  };
})();

module.exports = AI;
