const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

global.__basedir = path.join(__dirname, path.sep, '..');

const logging = require('../middleware/loged.js')
const indexRouter = require('./routes/index.js');


const app = express();
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__basedir, path.sep, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  console.log(Date.now());
  next();
})
app.use(logging)


// 
app.use('/api', indexRouter);
app.use('/', (req, res, next) => {
  res.render('index.ejs', {
    title: "Hello world"
  })
});



module.exports = app