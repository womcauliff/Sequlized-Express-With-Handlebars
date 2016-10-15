var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Initialize Express
var app = express();
app.set('port', (process.env.PORT || 5000));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));
// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Engine Setup
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Prepare Tables
var models  = require('./models');
var sequelizeConnection = models.sequelize;
sequelizeConnection.sync({force:true}) // {force:true} drops the table everytime the server starts.
// seed values
.then(function(){
	return models.Burger.create({
		burger_name: "Krabby Patty"
	});
})
.then(function() {
	return models.Burger.create({
		burger_name: "Whopper"
	});
});

// Routing Setup
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

// Listening
app.listen(app.get('port'), function () {
	console.log('App listening on PORT ' + app.get('port'));
});