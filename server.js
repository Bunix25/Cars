const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require("path")
const exphbs = require("express-handlebars")
const hbs = exphbs.create()
const app = express()
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("images"));
app.use(require("./controllers"));

const PORT = process.env.PORT || 3001;
// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});