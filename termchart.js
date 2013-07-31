
/**
 * Module dependencies.
 */
var Canvas = require('term-canvas')
    , cp = require('child_process')
    , path = require('path')
    , exec = cp.exec
    , spawn = cp.spawn;

var canvas = new Canvas(50, 100)
  , ctx = canvas.getContext('2d');


function run_cmd(cmd, args, callBack ) {
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

function watchLog(filename) {
    var fp = path.resolve(process.cwd(), filename);
    console.log(fp);
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
ctx.resetState();*/
