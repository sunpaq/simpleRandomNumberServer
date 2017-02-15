/*
How to config and run test server
=================================
1. install NodeJS on your host machine
2. run command 'npm install'
3. run command 'node server.js' in this folder
4. replace the 'http://example.com' with 'http://host-ip:port-number' in client app. example:(http://192.168.1.5:8081)
5. you can also test the server use 'http://127.0.0.1:8081/randhand' from a browser on host machine
*/

var finalhandler = require('finalhandler')
var http = require("http");
var fs = require("fs");

var Router = require('router');
var router = Router();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/randhand', function (request, response) {
	//calculate random number
	var handnum = getRandomInt(-1, 50);
	var handstr = handnum.toString();
	if (handnum < 0 || handnum > 45) {
		handstr = "invalid";
	}
	//write response
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end(handstr);
})

router.post('/reporterror', function (request, response) {
	request.on('data', function (data) {
		var report = data.toString();
		fs.appendFile("log.txt", report+"\n", function (err) {
			if (err) {
				console.log(err);
			}
		});
		console.log(report);
	});
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("error log record succeed");
})

router.get('/', function (request, response) {
	//write response
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("APIs: /randhand /reporterror");
})

http.createServer(function (request, response) {
	router(request, response, finalhandler(request, response));
}).listen(8081);

console.log("RockPaperScissors Test Server [port:8081]: started, you can access it use a browser");
