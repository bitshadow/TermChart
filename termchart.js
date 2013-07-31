
/**
 * Module dependencies.
 */
var Canvas = require('term-canvas')
    , cp = require('child_process')
    , EventEmitter = require('events').EventEmitter
    , util = require('util')
    , path = require('path')
    , exec = cp.exec
    , spawn = cp.spawn;

//process.stdout.getWindowSize()
var canvas = new Canvas(100, 100)
  , ctx = canvas.getContext('2d')
  , max_limit = 10;

module.exports = TermChart;

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

ctx.hideCursor();

function TermChart() {
    EventEmitter.apply(this);
}

util.inherits(TermChart, EventEmitter);
TermChart.prototype.max_limit = function(limit){
    this.max_limit = limit;
}

TermChart.prototype.draw = function(arr)
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    x = 3;
    arr.forEach(function(n){
        var y = 30
          , w = 5
          , h = 30*(n/max_limit);

        ctx.fillStyle = 'white';
        ctx.fillRect(x, y-h+3, w, h);
        ctx.fillStyle = 'black';
        ctx.fillText(n.toString(), x+2, y+1);
        x += 9;
    });
}

TermChart.prototype.trackLog = function(filename) {
    var fp = path.resolve(process.cwd(), filename);
    this.filename = fp;
    this.tail = spawn('tail', ['-F', this.filename]);
    this.tail.stdout.setEncoding('utf8');
    var lines = require('lines');
    lines(this.tail.stdout);
    termchart = this;

    this.tail.stdout.on('line', function(line){
        termchart.draw(line.split(" "));
    });

    this.tail.once('exit', function(code, signal){
        console.log("exit");
    });

   /* this.on('end', function(){
        console.log("end");
    });*/
}


var t = new TermChart();
t.trackLog("log.txt");
