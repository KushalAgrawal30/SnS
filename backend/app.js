const express = require('express');
const cors = require('cors');
const mainRouter = require('./router/mainRouter');

const app = express();

app.use(express.json());
app.use(cors())
app.set('view engine','ejs')

app.use('/',mainRouter)
 
module.exports = app;