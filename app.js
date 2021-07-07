const express = require('express');
const todoController = require('./controllers/todoController')

const app = express();
const port = 3000;

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(port);
console.log(`app is listening on ${port}`);