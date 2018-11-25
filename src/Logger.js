const Logger = (function(){
  const colorError = '\x1b[31m%s\x1b[0m';
  return {
    log: function(message){
      console.log(message);
    },
    error: function(message){
      console.log(message);
    },
    misunderstanding: function(message){
      console.log(colorError,message);
    },
  }
})();

module.exports = Logger;
