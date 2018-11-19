const C = require('./config');
const Logger = require('./Logger');
const SlackBot = require('slackbots');
const bot = new SlackBot({
    token: C.BOT_TOKEN,
    name: C.BOT_NAME
});

const AI = {}

AI.Init = () => Logger.Log(C.BOT_FRIENDLY_NAME + '\'s AI is running ✓');

AI.QueryResponses = {
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
    ]
};

AI.handleDirectMessage = function(message) {
    Logger.Log(`${C.BOT_FRIENDLY_NAME} received a direct message: "${message}"`);
    let simpleMessage = AI.SimplifyQuery(message);
    Logger.Log(`${C.BOT_FRIENDLY_NAME} simplified query to: "${simpleMessage}"`);

    let decision = 'AI.respondWithMisunderstanding(\'' + simpleMessage + '\')';

    Object.entries(AI.QueryResponses).forEach(([key, val]) => {
        AI.QueryResponses[key].forEach((item) => {
            if (simpleMessage === item) {
                decision = 'AI.' + key + '()';
            }
        });
    });
    Logger.Log(`${C.BOT_FRIENDLY_NAME} decided to respond using logic from: ${decision}`);
    eval(decision);
}

AI.SimplifyQuery = (message) => message.replace(/[?!]/g,'').toLowerCase().trim();


AI.respondWithMisunderstanding = (query='') => {
    const params = {
        icon_emoji: C.BOT_EMOJI
    };
    Logger.LogMisunderstanding(`${C.BOT_FRIENDLY_NAME} did not understand a user's query of "${query}"`);
    bot.postMessageToUser('jrundell', `I'm sorry, but I can't help with that yet.`, params);
}

AI.respondWithGreeting = (replyToName='') => {
    const params = {
        icon_emoji: C.BOT_EMOJI
    };
    bot.postMessageToUser('jrundell', `Yo ${replyToName}!`, params);
}

AI.respondWithHoursOfOperation = () => {
    const params = {
        icon_emoji: C.BOT_EMOJI
    };
    bot.postMessageToUser('jrundell', 'Taddle Creek\'s hours this week are:\nMon - Thurs: 7:30 am - 4 pm\nFri: 7:30 am - 2:30 pm', params);
}

module.exports = AI;
