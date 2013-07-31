
/**
 * Module dependencies.
 */
var Canvas = require('term-canvas')
    , cp = require('child_process')
    , EventEmitter = require('events').EventEmitter
    , util = require('util')
    , path = require('path')
    , spawn = cp.spawn;

//process.stdout.getWindowSize()
var canvas = new Canvas(100, 100)
  , ctx = canvas.getContext('2d');

module.exports = TermChart;

//Clear canvas when recieved terminate signal like [^C]
process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

// hide curser from context
ctx.hideCursor();

/*
 * Our termchart object inherits from eventemitter
 */
function TermChart() {
    EventEmitter.apply(this);
}
util.inherits(TermChart, EventEmitter);

/*
 *  max limit of chart
 *  @param limit
 */
TermChart.prototype.max_limit = function(limit){
    this.max_limit = limit;
}

/*
 *  Draw the given data array into the canvas
 *  @param arr contains the last line of the file
 */
TermChart.prototype.draw = function(arr)
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    x = 3;
    termchart = this;
    arr.forEach(function(n){
        var y = 30
          , w = 5
          , h = 30*(n/termchart.max_limit);

        ctx.fillStyle = 'white';
        ctx.fillRect(x, y-h+3, w, h);
        ctx.fillStyle = 'black';
        ctx.fillText(n.toString(), x+2, y+1);
        x += 9;
    });
}

/**
 *  Execute tail as child process.
 *  Generate for every single line appended
 *  @param absolute path of the file
 */
TermChart.prototype.execTail = function(filename){
    this.filename = filename;

    this.tail = spawn('tail', ['-F', this.filename]);
    this.tail.stdout.setEncoding('utf8');
    var lines = require('lines');
    lines(this.tail.stdout);
    termchart = this;
    this.tail.stdout.on('line', function(line){
        termchart.draw(line.split(" "));
    });

    this.tail.once('exit', function(code, signal){
        termchart.emit('error', new Error("tail subprocess ended badly"));
        termchart.emit('endtermchart');
    });
}

/**
 *  Track file. if data is appended the generate
 *  event to update the chart.
 *  @param filename
 */
TermChart.prototype.trackLog = function(filename) {
    var fp = path.resolve(process.cwd(), filename);
    this.execTail(fp);
    this.on('endtermchart', function(){
        this.tail.kill();
    })
}

TermChart.prototype.close = function(){
    this.emit('endtermchart');
}

var t = new TermChart();
t.max_limit(10);
t.trackLog("log.txt");
