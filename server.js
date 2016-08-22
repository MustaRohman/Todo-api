var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();


var PORT = process.env.PORT || 3000;
var todos = [];
var journals = [];
var todoNextId = 1;
var journalId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API root');
});

// ------ TODOS ------

// GET /todos?completed=true&q=work
app.get('/todos', function (req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		console.log('filtering completed todos...');
		filteredTodos = _.where(filteredTodos, {completed: true});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		console.log('filtering uncompleted todos...');
		filteredTodos = _.where(filteredTodos, {completed: false});
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function (todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		})
	}
	res.json(filteredTodos);
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
		res.json(matchedTodo);
	} else {
		res.status(404).json({"Error": "No todo found with id " + todoId});
	}

})

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);

})

// ------- JOURNALS -------

app.get('/journals', function (req, res) {
	res.json(journals);
})

app.get('/journals/:id', function (req, res) {
	var journalId = parseInt(req.params.id, 10);
	var matchedJournal = _.findWhere(journals, {id: journalId});

	if (matchedJournal) {
		res.json(matchedJournal);
	} else {
		res.status(404).send();
	}	
})

app.post('/journals', function (req, res) {
	var body = _.pick(req.body, 'name', 'text');

	if (!_.isString(body.name) || !_.isString(body.text) || body.name.trim().length === 0 
		|| body.text.trim().length === 0) {
		return res.status(404).send();
	}

	body.id = journalId++;
	journals.push(body);
	res.json(body);
})

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
