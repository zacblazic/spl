
var watcher = function() {
  var fs = require('fs');
  var Tail = require('tail').Tail;
  var parser = require('./log-parser')();
  var tail;

  return {
    watch: function(file, callback) {
      tail = new Tail(file);
      tail.on("line", function(data) {
        var entry = parser.parse(data);
        if (entry) {
          callback(null, entry);
        }
      });

      tail.on("error", function(error) {
        callback(error);
      });
    },
    unwatch: function() {
      if (tail) {
        tail.unwatch();
      }
    }
  };
}

module.exports = watcher;
