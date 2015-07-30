var http = require("http");
var process = require("process");

function startWebSvr(req,res){
	req.on("data",function(d){
		process.stdout.write(d);
	}).on("end",function(){
		console.log("DATA END!");
	}).on("error",function(e){
		console.error(e);
	});
}

var Server = http.createServer(startWebSvr).listen(8000,function(){
	console.log("Start at port 8000");
});