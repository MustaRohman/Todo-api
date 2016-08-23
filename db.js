var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/dev-todo-api.sqlite'
});

var db = {}; // We can return multiple properties thru module.exports using object

db.todo = sequelize.import(__dirname + '/models/todo.js'); // Lets you load in sequelize models from separate files
db.sequelize = sequelize; // Sequelize instance
db.Sequelize = Sequelize; // Sequelize library

module.exports = db;