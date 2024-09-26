const express = require('express');
const cors = require('cors');
const mainRouter = require('./router/mainRouter');
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express();

app.use(session({
  secret: 'ku11s09hal11', // Replace with a secure secret key
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // If using HTTPS, set it to true
}));

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your actual frontend domain
  credentials: true  // Allow cookies (credentials) to be sent in CORS requests
}));
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/',mainRouter)
 
module.exports = app;