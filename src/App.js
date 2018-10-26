const C = require('./config');
const Logger = require('./Logger');
const App = {}

App.Init = () => Logger.Log(`${C.BOT_FRIENDLY_NAME} is running ✓`);

module.exports = App;