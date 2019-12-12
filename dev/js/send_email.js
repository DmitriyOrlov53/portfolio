import unirest from 'unirest'
var req = unirest("POST", "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send");

req.headers({
	"x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
	"x-rapidapi-key": "SIGN-UP-FOR-KEY",
	"content-type": "application/json",
	"accept": "application/json"
});

req.type("json");
req.send({
	"personalizations": [
		{
			"to": [
				{
					"email": "orlov.dmitriy2303@outlook.com"
				}
			],
			"subject": "Hello, World!"
		}
	],
	"from": {
		"email": "orlow.dmitriy36@gmail.com"
	},
	"content": [
		{
			"type": "text/plain",
			"value": "Hello, World!"
		}
	]
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});