var express = require('express');
var app = express();

app.get('/', function(request, response){
	//throw 'Error';
	response.send('Ok');
});

module.exports = app;
//app.listen(3000);