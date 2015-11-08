var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var chatServer = require("./lib/chat_server");
var socketio = require("socket.io");
var cache = {};

var server = http.createServer(function(request,response){
	var filePath = false;
	if(request.url == "/"){
		filePath ="public/index.html";
	}else{
		filePath ="public" + request.url;
	}
	var absPath ="./" + filePath;
	serverStatic(response,cache,absPath);
});

chatServer.listen(server);
//server.listen(3000,function(){
//	console.log("server listening on port 3000");
//});
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
 


function send404(response){
	response.writeHead(404,{"Content-Type":"text/plan"});
	response.write("Error 404 :response not found");
	response.end();
}


function sendFile(response, filePath, fileContents){
	response.writeHead(200,{"Content-Type":mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}


function serverStatic(response,cache,absPath){
	if(cache[absPath]){
		sendFile(response,absPath,cache[absPath]);
	}else{
		fs.exists(absPath,function(exists){
			if(exists){
				fs.readFile(absPath,function(err,data){
					if(err){
						send404(response);
					}else{
						cache[absPath] = data;
						sendFile(response,absPath,data);
					}
				});
			}else{
				send404(response);
			}
		});
	}
}