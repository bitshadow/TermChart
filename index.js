var TermChart = require('./termchart')
    , fs = require('fs');

var t = new TermChart();
t.max_limit(10);
t.trackLog("log.txt");


function rand() {
    return Math.random() * t.max_limit | 0;
}

setInterval(function(){
  var data = [rand(), rand(), rand(), rand(), rand(), rand()];
  var log = data.join(' ') + "\n";
  console.log(data);
  fs.appendFile('log.txt', log, function (err) {
        if (err) throw err;
  });
}, 1000);
