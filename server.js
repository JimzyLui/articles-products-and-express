"use strict";

// require('dotenv').config({path: './.env'});
const moment = require('moment');
const path = require("path");
// const request = require('supertest');
const express = require("express");
const expressHBS = require("express-handlebars");
const bodyParser = require("body-parser"); // middleware

const session = require('express-session');
// var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const fs = require('fs'); // file system
const morgan = require('morgan');  // for logging
const rfs = require('rotating-file-stream');

const app = express();
const dirYYYY = moment().format('YYYY');
const dirMM = moment().format('MM');
const logDirectory = path.join(__dirname, 'logs/',dirYYYY,'/',dirMM);
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory,{ recursive: true });
const logFileName = moment().format('YYYYMMDD')+'_access.log'; 
// create a rotating write stream
const accessLogStream = rfs(logFileName, {
  interval: '1d', // rotate daily
  path: logDirectory
});
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));
 // setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// log all requests to access.log
// app.use(morgan('common', {
//   stream: fs.createWriteStream(accessLogStream)
// }));

const cookie_secret = 'asdfadfs';
// These 3 lines are for middleware passing of msgs
// app.use(cookieParser('secretString'));
// app.use(session({cookie: { maxAge: 60000 }}));
app.use(session({
  secret: cookie_secret,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
// app.use(function(req, res, next){
//   res.locals.success_messages = req.flash('success');
//   res.locals.error_messages = req.flash('fail');
//   next();
// });

app.use(bodyParser.urlencoded({ extended: true })); // parse forms
app.use(express.static(path.join(__dirname, "")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

const productRouter = require("./routes/products");
const articleRouter = require("./routes/articles");

const PORT = process.env.PORT || 8080;

// Register `hbs.engine` with the Express app.
const hbs = expressHBS.create({
  layoutsDir: "templates/layouts/",
  defaultLayout: "mainLayout",
  extname: "hbs"
});
// the extname applies to the layout only
// now can use special "layout: false" key to prevent the default layout from being used
app.engine("hbs", hbs.engine); // register hbs engine, 'hbs' applies to all files but layout

/* --OR-- */
/*
app.engine(
  "hbs",
  expressHBS({
    layoutsDir: "templates/layouts/",
    defaultLayout: "mainLayout",
    extname: "hbs"
  })
);
*/

app.set("view engine", "hbs"); // to point the view engine to the hbs engine
// to point the views location to a different location
app.set("views", path.join(__dirname, "/templates"));

app.use("/products", productRouter);
app.use("/articles", articleRouter);

app.get("/index", (req, res) => {
  res.render("index", { mainHeading: "Articles and Products" });
});

app.get("/", (req, res) => {
  res.render("index", { mainHeading: "Articles and Products" });
});

// catch anything else as set page not found 404
app.use((req, res, next) => {
  res.status(404).render("404");
});

// for caching
app.enable("view cache");
//process.env.NODE_ENV === "production"
/*
app.get("/", function(req, res, next) {
  res.render("/articles/index", { layout: false });
}); */
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
