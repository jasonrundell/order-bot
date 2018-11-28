const log = (function () {
  const _colorError = '\x1b[31m%s\x1b[0m';

  const info = function (message) {
    console.log(message);
  };

  const error = function (message) {
    console.log(message);
  };

  const misunderstanding = function (message) {
    console.log(_colorError, message);
  };

  return {
    info: info,
    error: error,
    misunderstanding: misunderstanding
  };
})();

export default log;
