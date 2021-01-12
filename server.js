const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection has established successfully');
});

todoRoutes.route('/').get(function(requestObj, responseObj) {
    // Retrieve todo items from database
    Todo.find(function(err, todos) {
        if(err) {
            console.log(err);
        }
        else {
            responseObj.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(requestObj, responseObj) {
    let id = requestObj.params.id;
    // Retrieve todo based on id
    Todo.findById(id, function(err, todo) {
        responseObj.json(todo);
    });
});

todoRoutes.route('/add').post(function(requestObj, responseObj) {
    let todo = new Todo(requestObj.body);
    // Save new todo to database
    todo.save()
        .then(todo => {
            responseObj.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            responseObj.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(requestObj, responseObj) {
    Todo.findById(requestObj.params.id, function(err, todo) {
        if (!todo)
            responseObj.status(404).send('Data is not found');
        else { 
            todo.todo_description = requestObj.body.todo_description;
            todo.todo_responsible = requestObj.body.todo_responsible;
            todo.todo_priority = requestObj.body.todo_priority;
            todo.todo_completed = requestObj.body.todo_completed;

            todo.save().then(todo => {
                responseObj.json('Todo updated');
            })
            .catch(err => {
                responseObj.status(400).send('Update not possible');
            });
        }
    });
});


app.use('/todos', todoRoutes);

app.listen(PORT, function () {
  console.log("The server is listening now on Port: " + PORT);
});
