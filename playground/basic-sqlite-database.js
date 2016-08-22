var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
})

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}

	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

sequelize.sync().then(function() {
	console.log('Everything is synced!');

	Todo.findAll({
		where: {
			id: 12
		}
	}).then(function (todos) {
		if (todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			})
		}
	})

	// Todo.create({
	// 	description: 'Backup macbook'
	// 	// completed: false
	// }).then(function(todo) {
	// 	return Todo.create({
	// 		description: 'Take out garbage',
	// 	});
	// }).then(function () {
	// 	// return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%take%'
	// 			}
	// 		}
	// 	});
	// }).then(function (todos) {
	// 	if (todos) {
	// 		todos.forEach(function (todo) {
	// 			console.log(todo.toJSON());
	// 		})
	// 	} else {
	// 		console.log('No todo found');
	// 	}
	// }).catch(function (e) {
	// 	console.log(e);
	// });
})