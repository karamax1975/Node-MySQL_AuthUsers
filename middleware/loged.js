const { join, sep } = require('path');
const morgan = require('morgan');
require('dotenv').config();
const fs = require('fs');



const logsFile = join(__basedir, sep, process.env.DIRLOGS, 'access.log');

const accessLogStream = fs.createWriteStream(logsFile, { flags: 'a' });

const logging = morgan('combined', { stream: accessLogStream })

module.exports = logging;