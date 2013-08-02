var TermChart = require('./termchart')
    , write = require('fs').appendFile;

var t = new TermChart();
t.max_limit(10);
t.trackLog("log.txt");


function r() {
    return Math.random() * t.max_limit | 0;
}

setInterval(function(){
  var data = [r(),r(), r(), r(), r(), r()];
  var log = data.join(' ') + "\n";

  write('log.txt', log, function(err){
        if (err) throw err;
  });
}, 1000);
