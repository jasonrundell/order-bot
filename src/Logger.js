const C = require('./config');
const Logger = {}

Logger.Error = (data) => console.log(data);
Logger.Log = (message) => console.log(message);
Logger.LogMisunderstanding = (message) => console.log('\x1b[31m%s\x1b[0m',message);

module.exports = Logger;