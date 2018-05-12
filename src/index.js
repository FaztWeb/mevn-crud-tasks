const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mevn-crud');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/', require('./routes/index'));
app.use('/api/tasks', require('./routes/tasks'));

// static
app.use(express.static(path.join(__dirname, 'public')));;

// listenning on port
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
