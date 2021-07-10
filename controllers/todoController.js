var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
const uri = 'mongodb+srv://test:test@nodetodo.ewvt2.mongodb.net/nodeNinja?retryWrites=true&w=majority';

try {
  mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected"));    
  } catch (error) { 
  console.log("could not connect");    
  }

// create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'watch naruto'}).save(function(err) {
//   if (err) throw err;
//   console.log('item saved');
// });

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  
  app.get('/todo', (req, res) => {
    // get data from mongo db and pass it to the view
    Todo.find({}, function(err, data) {
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', (req, res) => {
    // delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if(err) throw err;
      res.json(data);
    });
  });
}