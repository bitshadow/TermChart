
/**
 * Module dependencies.
 */
var Canvas = require('term-canvas')
    , cp = require('child_process')
    , path = require('path')
    , exec = cp.exec
    , spawn = cp.spawn;

var canvas = new Canvas(50, 100)
  , ctx = canvas.getContext('2d')
  , max_limit = 100;


function drawGraph(hash){

}

function getStats(line)
{
   var arr = line.split(" ");
    console.log(arr);
}

function getParams(line){
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

/*run_cmd( "tail", ["-f"], function(data){
    console.log(data);
    console.log("------------------------------------------------------------------------------------");
});*/

watchLog("log.txt");
































/*
ctx.clear();

ctx.fillStyle = 'red';
ctx.fillRect(5, 5, 20, 10);

ctx.fillStyle = 'blue';
ctx.fillRect(27, 5, 20, 10);

ctx.fillStyle = 'yellow';
ctx.fillRect(49, 5, 20, 10);

console.log('\n\n\n');
ctx.resetState();

function run_cmd(cmd, args, callBack )
{
    var child = spawn(cmd, args);
    var data = "";

    child.stdout.on('data', function(buffer){
        var data = buffer.toString();
        callBack(data);
    });

    //TODO top never going to end.
    //    child.stdout.on('end', function(){
    //callBack(data)
    //});
}

*/
