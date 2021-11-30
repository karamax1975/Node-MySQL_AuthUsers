require('dotenv').config();
const http = require('http');

const app = require('../server/index.js');


const PORT = process.env.PORT || '3000';
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Now listening on port', PORT);


})