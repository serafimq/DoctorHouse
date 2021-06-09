const fs = require('fs');
const http = require('http');
const path = require('path');
const cors = require('cors');
const WebSocket = require('ws');
const logger = require('morgan');
const express = require('express');
const formData = require('express-form-data');
const fileUpload = require("express-fileupload");
const { sessionParser } = require('./ServDB/config');
const { createErr, cathErrAndSendAnswer } = require('./middleware/checkErrors');

const apiRouterUser = require('./routes/apiRouterUser');
const apiRouterMailer = require('./routes/apiRouterMailer');
const apiRouterEvents = require('./routes/apiRouterEvents');
const apiRouterDoctor = require('./routes/apiRouterDoctor');
const apiRouterHistory = require('./routes/apiRouterHistory');
const apiRouterHomepage = require('./routes/apiRouterHomepage');

const app = express();

app.set('trust proxy', 1);
app.set('cookieName', 'connect.sid');

app.use(logger('dev'));
app.use(express.json());
app.use(sessionParser);
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));
app.use(fileUpload())

app.use('/api/v1/user', apiRouterUser);
app.use('/api/v1/mailer', apiRouterMailer);
app.use('/api/v1/events', apiRouterEvents);
app.use('/api/v1/doctors', apiRouterDoctor);
app.use('/api/v1/history', apiRouterHistory);
app.use('/api/v1/homepage', apiRouterHomepage);

app.use(createErr, cathErrAndSendAnswer);

module.exports = app;
