var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

function funGetType(filePath){
  var contentType = "";
  var ext = path.extname(filePath);
  switch(ext){
    case ".html":
      contentType = "text/html";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    default:
      contentType = "application/octet-stream";
      break;
  }
  return contentType;
}

function webServer(req,res){
  var requrl = req.url;
  var pathName = url.parse(requrl).pathname;
  var pathExtName = path.extname(pathName);
  if(pathExtName == ""){
    pathName = "/";
  }
  if(pathName.charAt(pathName.length - 1) == "/"){
    pathName +="index.html";
  }
  var fileName = pathName.slice(1);
  console.log("path:" + pathName);
  console.log("extend:" + pathExtName);
  console.log("filePath:" + fileName);
  fs.exists(fileName,function(exists){
    if(exists){
      res.writeHead(200,{"Content-Type":funGetType(fileName)});
      var stream = fs.createReadStream(fileName,{flag:"r",encoding:null});
      stream.on("error",function(){
        res.end("<h1>error occured!</h1");
      });
      stream.pipe(res);
    }else {
      res.writeHead(404,{"Content-Type":"text/html"});
      res.end("<h1>404 Not Found</h1>");
    }
  });
}

var newWebSvr = http.createServer(webServer);
newWebSvr.on("error",function(error){
  console.log("Error: " + error);
});
newWebSvr.listen(9000,function(){
  console.log("The server is running on port 9000");
});