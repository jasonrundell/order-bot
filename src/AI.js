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
        'help me',
        'i need help',
        'i need some help',
        'i need a little help',
        'what can you help with',
        'what can you do',
        'what do you do'
    ],
    respondWithBalance: [
      'balance',
      'what\'s my balance',
      'whats my balance',
      'what is my balance',
      'how much do i have left',
      'how much money do i have left',
      'do i have anything',
      'do i have a balance'
    ],
    respondWithState: [
      'open',
      'state',
      'are you open',
      'are you open right now'
    ],
    respondWithIdentity: [
      'identify',
      'identify yourself',
      'who are you',
      'what are you'
    ],
    respondWithLargeCoffeeToGo: [
      'large coffee to go',
      'large coffee',
      'large black coffee',
      'larg coffee black',
      'lg coffee',
      'lg coffee to go',
      'lg coffee black',
      'lg black coffee',
      'lrg coffee',
      'lrg coffee to go',
      'lrg coffee black',
      'lrg black coffee'
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
        case 'respondWithBalance': {
          return AI.respondWithBalance();
        }
        case 'respondWithState': {
          return AI.respondWithState();
        }
        case 'respondWithIdentity': {
          return AI.respondWithIdentity();
        }
        case 'respondWithLargeCoffeeToGo': {
          return AI.respondWithLargeCoffeeToGo();
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
      return `Current commands I am familiar with are:
      \n\`hours\` - I will give you the store hours.
      \n\`balance\` - I will tell you your remaning balance.
      \n\`open\` - I will tell you if Taddle Creek is open.
      \n\`identify\` - I will tell you my purpose.
      `;
    },
    respondWithBalance: function() {
      return `You have $25.00 CAD remaining.`;
    },
    respondWithState: function() {
      let date = new Date();
      let currentHour = parseInt(date.getHours());
      let response = `Ask me again later.`;
      if (currentHour >= 7 && currentHour <= 16) {
        response = `We're open!`;
      } else {
        response = `We're currently closed. We re-open at 7:30 am.`;
      }

      return response;
    },
    respondWithIdentity: function() {
      return `I'm the Taddle Creek Slack Bot! You can ask me questions or find out more by asking me for \`help\``;
    },
    respondWithLargeCoffeeToGo: function() {
      //https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22Are%20you%20trying%20to%20order%20a%20large%20coffee%20for%20%242.50%3F%22%2C%22attachments%22%3A%5B%7B%22text%22%3A%22Your%20balance%20after%20would%20be%20%2410.50%22%2C%22fallback%22%3A%22You%20are%20unable%20to%20choose%20a%20game%22%2C%22callback_id%22%3A%22wopr_game%22%2C%22color%22%3A%22%23000000%22%2C%22attachment_type%22%3A%22default%22%2C%22actions%22%3A%5B%7B%22name%22%3A%22drink%22%2C%22text%22%3A%22Yes%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22large_coffee_2go%22%2C%22confirm%22%3A%7B%22title%22%3A%22Are%20you%20sure%3F%22%2C%22text%22%3A%22Are%20you%20sure%3F%22%2C%22ok_text%22%3A%22Yes%22%2C%22dismiss_text%22%3A%22No%22%7D%7D%2C%7B%22name%22%3A%22cancel%22%2C%22text%22%3A%22Cancel%22%2C%22style%22%3A%22danger%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22cancel%22%7D%5D%7D%5D%7D
      return `{
          "text": "Are you trying to order a large coffee for $2.50?",
          "attachments": [
              {
                  "text": "Your balance after would be $10.50",
                  "fallback": "You are unable to choose a game",
                  "callback_id": "wopr_game",
                  "color": "#000000",
                  "attachment_type": "default",
                  "actions": [
                      {
                          "name": "drink",
                          "text": "Yes",
                          "type": "button",
                          "value": "large_coffee_2go",
                          "confirm": {
                              "title": "Are you sure?",
                              "text": "Are you sure?",
                              "ok_text": "Yes",
                              "dismiss_text": "No"
                          }
                      },
                      {
                          "name": "cancel",
                          "text": "Cancel",
                          "style": "danger",
                          "type": "button",
                          "value": "cancel"
                      }
                  ]
              }
          ]
      }`;
    }
  };
})();

module.exports = AI;
