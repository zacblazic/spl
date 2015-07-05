'use strict';

(function() {
  var logger = 'http://localhost:3000';

  var start = function() {
    var server = $("#server").val();
    var socket = io.connect(logger);
    socket.emit('start', { server: server })

    socket.on('entry', entry);
    socket.on('error', console.log);
  };

  var entry = function(entry) {
    var $entries = $('table.entries');

    var $entry = $('<tr>', { class: 'entry' });
    var $timestamp = $('<td>', { text: entry.timestamp });
    var $category = $('<td>', { text: entry.category });
    var $level = $('<td>', { text: entry.level });
    var $correlation = $('<td>', { text: entry.correlation });
    var $message = $('<td>', { text: entry.message });

    $entry.append($timestamp);
    $entry.append($category);
    $entry.append($level);
    $entry.append($correlation);
    $entry.append($message);

    $entries.append($entry);

    console.log(entry);
  };

  $(document).ready(function() {
    $('#start').on("click", function() {
      start();
    });
  });
})();
