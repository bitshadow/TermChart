
/**
 * Module dependencies.
 */
var Canvas = require('term-canvas')
    , cp = require('child_process')
    , path = require('path')
    , exec = cp.exec
    , spawn = cp.spawn;

var canvas = new Canvas(50, 50)
  , ctx = canvas.getContext('2d')
  , max_limit = 10;


process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});


ctx.hideCursor();

function getStats(line)
{
    var arr = line.split(" ");
    console.log(arr);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    x = 3;
    arr.forEach(function(n){
        var y = 20
          , w = 5
          , h = 20*(n/max_limit);

        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y-h+3, w, h);
        ctx.fillStyle = 'black';
        ctx.fillText(n.toString(), x+2, y+1);
        x += 9;
    });
}

function watchLog(filename) {
    var fp = path.resolve(process.cwd(), filename);
    this.fname = fp;
    this.tail = spawn('tail', ['-F', this.fname]);
    this.tail.stdout.setEncoding('utf8');
    var lines = require('lines');
    lines(this.tail.stdout);

    this.tail.stdout.on('line', function(line){
        getStats(line);
    });

    this.tail.once('exit', function(code, signal){
        console.log("exit");
    });

   /* this.on('end', function(){
        console.log("end");
    });*/
}

watchLog("log.txt");
