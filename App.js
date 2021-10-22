var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB = 'mongodb://localhost/to-do-list';
var PORT = 8000;

mongoose.connect(DB);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.set('view-engine', 'ejs');

var taskSchema = mongoose.Schema({
    
    task: String,
    status: Boolean,
});

var Task = mongoose.model("Task", taskSchema);

app.get('/', function(req, res){

    res.render('index.ejs');
});

app.post('/', function(req, res){
  
    var newTask = new Task();
    newTask.task = req.body.task;
    newTask.status = 0;

    newTask.save(function(err, result){
        if(err){
            res.send(err);
        } 
    });
});

app.get('/all-tasks', function(req, res){
    
    Task.find({}, function(err, result){
        res.render('displayTasks.ejs', {tasks: result});
    });
});

app.listen(PORT, function(){

    console.log('Server listening on PORT :', PORT);
});