var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var users = [{username: "John123", password:"password"}];

router.route('/')
	.get(function(request, response) {
		response.status(200);
		if (request.cookies.token) {
			response.render('index.ejs', {user: jwt.verify(request.cookies.token, 'qpdavc qqhnei(^%h3p2-').username});
		} else {
			response.render('index.ejs', {user: undefined});
		}
	});
	
router.route('/signup')
	.get(function(request, response) {
		
		response.render('signup.ejs');
		response.end();
	});
	
router.route('/signin')
	.get(function(request, response) {
		console.log("Users:");
		console.log(users);
		response.render('signin.ejs');
	})
	.post(function(request, response) {
		
		if (users.filter(function(el) {
			return el.username === request.body.username &&
			el.password === request.body.password;
		}).length > 0) {
			var user = users[users.map(el => el.username).indexOf(request.body.username)];
			response.cookie('token', jwt.sign(user, 'qpdavc qqhnei(^%h3p2-'));
			response.send("User found");
		} else {
			response.send("Username or password is incorrect.");
		}
		
	});
	
router.route('/accounts')
	.post(function(request, response) {
		
		users.push({
			username: request.body.username,
			password: request.body.password
		});
		var user = jwt.sign(users[users.length - 1], 'qpdavc qqhnei(^%h3p2-');
		response.cookie('token', user);
		console.log("Users:");
		console.log(users);
		response.redirect('/');
		response.end();
		
	})
	.delete(function(request, response) {
		if (request.cookies.token) {
			users.splice(users.indexOf(jwt.verify(request.cookies.token, 'qpdavc qqhnei(^%h3p2-')), 1);
		}
		response.clearCookie('token');
		response.send("message");
	});
	
router.route('/signout')
	.get(function(request, response) {
		response.clearCookie('token');
		response.redirect("/");
		response.end();
	});
	
router.route('/delete')
	.get(function(request, response) {
		response.render("delete.ejs");
	});

module.exports = router;