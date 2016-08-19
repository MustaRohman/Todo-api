var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();


var PORT = process.env.PORT || 3000;
var todos = [];
var categories = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API root');
});

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
})
// GET /todos/id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
})

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) 
		|| body.description.trim().length === 0) {
		return res.status(404).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);

	res.json(body);
})

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);

	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		todos = _.without(todos, matchedTodo);
		res.json(todos);
	} else {
		res.status(404).json({"Error": "No todo found with id " + todoId});
	}

})

// POST /categories
app.post('/categories', function (req, res) {
	var body = req.body;
	categories.push(body);
	console.log(categories);
	res.json(body);
})

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});