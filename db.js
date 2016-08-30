var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	// This will be true if running on heroku
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
}



var db = {}; // We can return multiple properties thru module.exports using object

db.todo = sequelize.import(__dirname + '/models/todo.js'); // Lets you load in sequelize models from separate files
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize; // Sequelize instance
db.Sequelize = Sequelize; // Sequelize library

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports = db;