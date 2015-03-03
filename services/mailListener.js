var MailListener = require("mail-listener2");
//var fs = require("fs");
//var path = require('path'); 
//var request = require('request'); 
var imap = require("./imap.js");
//var pdfParser = require("./pdfParser.js");
//var qrcode = require("./qrcode.js");
//var documentService = require('./document.js');
var serverConfig = require('../config/serverConfig.js').config;

var mapAttachmentID = new Array();

var mailListener = new MailListener(serverConfig);


exports.launchMailListener = function(){
	imap.init();
	//mailListener.start(); // start listening

	mailListener.on("server:connected", function(){
	  console.log("imapConnected");
	  //imap.purgeMailBox();
	});

	mailListener.on("server:disconnected", function(){
	  console.log("imapDisconnected");
	});

	mailListener.on("error", function(err){
	  console.log(err);
	});


	mailListener.on("mail", function(mail, seqno, attributes){
		// do something with mail object including attachments
		var attachment = mail.attachments;
		// mail processing code goes here
		//Map the attachment ID with the mail ID. It will be then easier to delete it.
		mapAttachmentID[attachment[0].contentId] = attributes.uid;
		imap.deleteMessage(attributes.uid);
	});

	mailListener.on("attachment", function(attachment){
		/*
		var output = fs.createWriteStream("attachments/"+attachment.generatedFileName);
		var pdfInData = "data:application/pdf;base64,";
		attachment.stream.on('data', function(chunk) {
			var bufferTemp = new Buffer(chunk, 'binary').toString('base64');
			pdfInData += bufferTemp;
		});
		
		output.on('finish', function() {
			pdfParser.transformPDF2PNG("C:\\Users\\i1401\\Desktop\\elyes\\nodeJS\\attachments\\"+attachment.generatedFileName, function(){
				
				var i = 0 ;
				var pageNumber = 0;
				var pngFileName = "C:\\Users\\i1401\\Desktop\\elyes\\nodeJS\\attachments\\" + attachment.generatedFileName.substring(0, attachment.generatedFileName.length-4);
				var metadataToAssociate = new Object();
				
				while(fs.existsSync(pngFileName+ ++i +".png")){
					
				}
				pageNumber = i;
				qrcode.decode(pngFileName+"1.png", function(value){
					console.log("QRCode trouve = " + value);
					if(value != null){
						metadataToAssociate = JSON.parse(value);
					}
					

					metadataToAssociate.document = pdfInData;
					documentService.insertDocument(metadataToAssociate, function(valueReturned){
						console.log("Document Inserer " + valueReturned._id);
					});
					fs.unlink(pngFileName+"1.png", function (err) {});
				});	
				for(i = 2 ; i <=pageNumber ; i++){
					fs.unlink(pngFileName+i+".png", function (err) {});
				}
				fs.unlink(pngFileName+".pdf", function (err) {});
			});
		});
		attachment.stream.pipe(output);
		*/
	});	
};

