file = process.argv[2] || './credentials'
var credentials = require(file);
var googleapis = require('googleapis');
var OAuth2 = googleapis.auth.OAuth2;
var open = require("open");
var fs= require("fs")

var oauth2Client = new OAuth2(credentials.CLIENT_ID, credentials.CLIENT_SECRET, credentials.REDIRECT_URL);


if (!credentials || !credentials.CLIENT_ID) {
	console.log("You must put your oAuth credentials in ./credentials.js, or add a path as an argument")
	console.log("get them at https://console.developers.google.com")
	console.log("  ")
	console.log("OAuth is hard, but you can do it!  ")
	return
}

command_line_ask = function(question, format, callback) {
	var stdin = process.stdin,
		stdout = process.stdout;
	stdin.resume();
	console.log(question + ": ");
	stdin.once('data', function(data) {
		data = data.toString().trim();
		if (format.test(data)) {
			callback(data);
		} else {
			stdout.write("paste in the data and press enter ;)\n");
			command_line_ask(question, format, callback);
		}
	});
}


// generates a url that allows offline access and asks permissions
// for Google+ scope.
var url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: 'https://www.googleapis.com/auth/freebase'
});
console.log('opening authentication url in your browser... ')
open(url)
console.log(" ")
command_line_ask("  what is the 'code' from the resulting webpage: ", /.+/, function(code) {
	console.log(" ")
	console.log(" ")
	console.log(" ")
	console.log('great.  .generating tokens...')
	oauth2Client.getToken(code, function(err, tokens) {
		if (err) {
			console.log(err)
			return
		}
		console.log(" ")
		console.log(" ")
		console.log(" ")
		console.log("woohoo! it's working..")
		console.log(" ")
		console.log(" ")
		//write it to the credentials file
		credentials.WRITE_TOKEN=tokens.access_token;
		var str="//automatically generated from ./authenticate.  Don't commit!! \n"
		str+="module.exports= " + JSON.stringify(credentials, null, 2)
		fs.writeFileSync("./auth/credentials.js", str)
		console.log("   ")
		console.log("   ")
		console.log("ok, your new access token is written into ./auth/credentials.js.")
		console.log("you're ready to go!")
		console.log("you rule!")
		// console.log("try out:  garden.test_write() ")
		process.exit(0)
	})
})