var https = require("https");
var fs = require("fs");
var url = require("url");

var APPID = "wx0c7cb2ac3890f6ff";
var APPSECRET = "5432f6c5abc2e02cbbb7afaf6243d911";
var ACCESS_TOKEN = "";
var FILENAME = "01";

//url of getting ACCESS_TOKEN
var urlGetAT = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET;
https.get (urlGetAT,function(res){
	res.setEncoding("utf8");
	res.on("data",function(chunk){
		ACCESS_TOKEN = JSON.parse(chunk);
		ACCESS_TOKEN = ACCESS_TOKEN.access_token;
		console.log("access_token:" + ACCESS_TOKEN);
	});
	res.on("end",function(){
		var urlGetTicket = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token="+ACCESS_TOKEN;
		var post_option = url.parse(urlGetTicket);
		post_option.method = "POST";
		post_option.port = 443;

		for(var i = 0;i < 10;i++){

			var post_data = JSON.stringify({
				'action_name':'QR_LIMIT_SCENE',
				'action_info':{
					'scene':{
						'scene_id':i
					}
				}
			});

			post_option.headers = {
				'Content-Type':'application/json',
				'Content-Length':post_data.length
			};

			//console.log("start get ticket");
			var post_req = https.request(post_option,function(res){
				res.setEncoding("utf8");
				res.on('data',function(chunk){
					var resObj = JSON.parse(chunk);
					var ticket = resObj.ticket;
					console.log("ticket "+i+": " + ticket);
					fs.appendFile('ticket.txt',ticket + '\n',function(err){});

					var urlGetQRCode = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
					https.get(urlGetQRCode,function(res){
						var imgData = "";
						res.setEncoding("binary");
						res.on("data",function(chunk){
							imgData+=chunk;
						});
						res.on("end",function(){
							fs.writeFile("../images/" + ticket + ".jpg",imgData,"binary",function(err){
								if(err){
									console.log("download fail");
								}
								console.log("download success");
							});
						});
					});

				});
				res.on("error",function(e){
					console.log("error: " + e);
				});

			});
			post_req.write(post_data);
			post_req.end();
		}

	});
});

//下载图片
/*var url = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFJ8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzcwUXB5N3ZsUHpkR00teEprR2hRAAIEAeotVgMEAAAAAA==";
https.get(url,function(res){
	var imgData = "";
	res.setEncoding("binary");
	res.on("data",function(chunk){
		imgData+=chunk;
	});
	res.on("end",function(){
		fs.writeFile("../images/" + FILENAME + ".jpg",imgData,"binary",function(err) {
			if(err){
				console.log("download fail");
			}
			console.log("success");
		});
	});
});*/

var server = https.createServer(function(req,res){}).listen('8088');
console.log("http start");
