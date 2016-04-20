
var logger = function() {
  var fs = require('fs');
  var path = require('path');
  var watcher = require('./log-watcher')();

  var networkPrefix = '\\\\';
  var defaultLogDirectory = "\\c$\\Program Files\\Common Files\\Microsoft Shared\\Web Server Extensions\\15\\LOGS"

  var getLatestFile = function(directory, callback) {
    fs.readdir(directory, function(err, files) {
      if (err) {
        callback(err);
      }

      var latestFile = { mtime: 0 };

      files.forEach(function(file) {
        var filePath = path.join(directory, file);
        var fileStat = fs.statSync(filePath);

        if (fileStat.mtime > latestFile.mtime) {
          latestFile = {
            path: filePath,
            mtime: fileStat.mtime
          };
        }
      });

      callback(null, latestFile.path);
    });
  };

  return {
    start: function(options, socket) {
      console.log(options);

      var server = options.server;
      if (!server) {
        server = 'localhost';
      }

      var logDirectory = networkPrefix + server + defaultLogDirectory;
      getLatestFile(logDirectory, function(err, file) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(file);

        watcher.watch(file, function(error, entry) {
          if (error) {
            return socket.emit("error", error);
          }
          socket.emit("entry", entry)
        });

      });
    },
    stop: function() {
      watcher.unwatch();
    }
  };
};

module.exports = logger;
