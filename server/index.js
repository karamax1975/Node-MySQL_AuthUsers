const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

global.__basedir = path.join(__dirname, path.sep, '..');

const logging = require('../middleware/loged.js')
const indexRouter = require('./routes/index.js');
const adminRoutes = require('./routes/admin_route.js');
const authPage = require('../middleware/authPage_middleware.js');
const apiDefender = require('../middleware/api_auth_middleware.js');


const app = express();
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__basedir, path.sep, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

// app.use((req, res, next) => {
//   console.log(Date.now());
//   next();
// })
app.use(logging)

app.use('/public', express.static('public'));
// 
app.use('/api', indexRouter);
app.use('/api/admin', apiDefender, adminRoutes)

app.use('/admin', authPage, (req, res, next) => {
  res.render('admin.ejs');
})
app.use('/', (req, res, next) => {
  res.render('index.ejs', {
    title: "Hello world"
  })
});




module.exports = app