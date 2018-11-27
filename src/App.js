const Logger = require('./Logger');
const AI = require('./AI');
const Bot = require('./Bot');

const App = (function(){
  const CONFIG = {
    APP_NAME: 'Taddle Creek Slack Bot'
  };

  return {
    init: function(){
      Logger.log(`${CONFIG.APP_NAME} has launched ...`);
      Bot.init();
      AI.init();
    }
  };
})();

module.exports = App;
