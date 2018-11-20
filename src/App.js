const C = require('./config');
const Logger = require('./Logger');
const App = (function(){
  return {
    init: function(){
      Logger.log(`${C.BOT_FRIENDLY_NAME} is running ✓`);
    }
  }
})();

module.exports = App;
