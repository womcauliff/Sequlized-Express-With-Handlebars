var express = require('express');
var router = express.Router();

var models  = require('../models');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.Burger.findAll({}).then(function(burgers) {
		var hbsObject = {burgers : burgers};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	models.Burger.create({
		burger_name: req.body.burger_name,
		devoured: req.body.devoured
	})
	.then(function() {
		res.redirect('/');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	models.Burger.update(
		{devoured : req.body.devoured},
		{
			where: {id : req.params.id} 
		}
	)
	.then(function () {
		res.redirect('/');
	});
});

module.exports = router;