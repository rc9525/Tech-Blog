const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const moment = require('moment');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connections');

const checkAuth = require('./utils/auth.js')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// These are the ones that make handlebars work with express
const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")
app.use(routes)

// app.get('/', checkAuth, (req, res) => {
// app.get('/', (req, res) => {
//     res.render("homepage")
// })

// app.get('/login', (req, res) => {
//     res.render("login")
// })

// app.get('/clock', (req, res) => {
//     res.render("clock")
// })

// app.get('/profile', (req, res) => {
//     res.render("profile")
// })

// app.get('/clockout', (req, res) => {
//     var clockInTime = moment("2022-03-17"); //get the saved clockin from the database
//     var clockOutTime = moment(); // get the current time
//     var totalTime = clockOutTime.diff(clockInTime, 'minutes')
//     res.json({
//         message: "Total time is " + totalTime + " minutes"
//     });
// })

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
 
