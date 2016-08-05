var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(require('./routes.js'));

app.set('view engine', 'ejs');


app.listen(process.env.PORT || 8080, process.env.IP || 'localhost');