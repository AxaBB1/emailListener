var config = {
	username: "elyeshm@gmail.com",
	password: "Elyeshm1806",
	host: "imap.gmail.com",
	port: 993, // imap port
	//tls: false,
	//tlsOptions: { rejectUnauthorized: false },
	mailbox: "INBOX", // mailbox to monitor
	//searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
	//markSeen: true, // all fetched email willbe marked as seen and not fetched next time
	//fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
	mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
	attachments: true, // download attachments as they are encountered to the project directory
	attachmentOptions: { directory: "attachments", stream: "true"} // specify a download directory for attachments
} ;

exports.config = config;