
var parser = function() {
  var _separator = '\t';

  var parse = function(line) {
    var columns = line.split(_separator);
    console.log(columns);

    if (columns.length < 9) {
      console.log("invalid log entry");
      return;
    }

    return {
      timestamp: columns[0],
      process: columns[1],
      threadId: columns[2],
      area: columns[3],
      category: columns[4],
      eventId: columns[5],
      level: columns[6],
      message: columns[7],
      correlation: columns[8]
    };
  };

  return {
    parse: parse
  }
};

module.exports = parser;
