const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const moment = require('moment');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connections');
require("dotenv").config();

const checkAuth = require('./utils/auth.js')
const { use } = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
  expires: new Date(Date.now()+ (30 * 86400 * 1000))
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});