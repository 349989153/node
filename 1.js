console.time("[WebSvr][Start]");
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

function funGetContentType(filePath){
  var contentType = "";
  var ext = path.extname(filePath);
  console.log("extname: " + ext);
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
    case ".gif":
    contentType = "image/gif";
    break;
    case ".jpg":
    contentType = "image/jpeg";
    break;
    case ".png":
    contentType = "image/png";
    break;
    case ".ico":
    contentType = "image/icon";
    break;
    default:
    contentType = "application/octet-stream";
  }
  return contentType;
}

function funWebSvr(req,res){
  var requrl = req.url;
  var pathName = url.parse(requrl).pathname;
  console.log("parse pathName :" + pathName);
  if(path.extname(pathName) == ""){
    pathName = "/";
  }
  if(pathName.charAt(pathName.length - 1) == "/"){
    pathName += "index.html";
  }
  console.log("pathName:" +pathName);
  var filePath = pathName.slice(1);
  console.log("filePath:" + filePath);
  fs.exists(filePath,function(exists){
    if(exists){
      res.writeHead(200,{"Content-Type":funGetContentType(filePath)});
      var stream = fs.createReadStream(filePath,{flags:"r",encoding:null});
      stream.on("error",function(){
        res.writeHead(404);
        res.end("<h1>404 Not Found</h1>");
      });
      stream.pipe(res);
    }else {
      console.log("The file does not exist!");
      res.writeHead(404,{"Content-Type":"text/html"});
      res.end("<h1>404 Not Found</h1>");
    }
  });
}

var webSvr = http.createServer(funWebSvr);
webSvr.on("error",function(error){
  console.log(error);
});
webSvr.listen(8000,function(){
  console.log("[WebSvr][Start] running at localhost:8000");
  console.timeEnd("[WebSvr][Start]");
});