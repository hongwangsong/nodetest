exports.listen = function(server){
	io = socket.listen(server);
	io.set("log level",1);
	io.sockets.on("connection",function(socket){
		guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
		joinRoom(socket,"Lobby");
		handleMessageBroadcasting(socket,nickNames);
		handleNameChangeAttempts(socket,nickName,namesUsed);
		handleRoomJoining(socket);
		
		socket.on("rooms",function(){
			socket.emit("rooms",io.sockets.manager.rooms);
			
		});
		handleClientDisconnection(socket,nickNames,namesUsed);
				
	});
};