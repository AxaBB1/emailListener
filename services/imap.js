var inbox = require("inbox");
var MailParser = require("mailparser").MailParser;

var mailparser = new MailParser({
	streamAttachments: true
});
var client;

exports.init = function(){

	client = inbox.createConnection(false, "imap.gmail.com", {
		secureConnection: true,
		auth:{
			user: "elyeshm@gmail.com",
			pass: "Elyeshm1806"
		}
	});

	client.connect();

	client.on("connect", function(){
		console.log("Connection to the mail box succeed");
		client.openMailbox("INBOX", function(error, info){
			if(error) throw error;
			console.log("Message count in INBOX: " + info.count);				
		});
	});
	
	client.on("new", function(message){
		console.log("A new message just shows up");
		
		mailparser.on("attachment", function(attachment, mail){
			console.log(attachment.generatedFileName);
		});
		client.createMessageStream(message.UID).pipe(mailparser);

	});
}

exports.deleteMessage= function(uidMail){
	client.deleteMessage(uidMail, function(){
		console.log("Message supprimé " + uidMail);
	});
}

exports.close = function(){
	client.close();
}

exports.purgeMailBox = function(){
	console.log("Start to purge the inbox messages...");
	for(var i = 1800; i > 1663 ; i--){
		
		client.deleteMessage(i, function(){
		});
	}
	console.log("All old messages have been deleted");
}