"use strict";

var path = require("path");
const express = require("express");
const expressHBS = require("express-handlebars");
const bodyParser = require("body-parser"); // middleware

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // parse forms
app.use(express.static(path.join(__dirname, "")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

const productRoutes = require("./routes/products");
const articleRoutes = require("./routes/articles");

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

app.use("/products", productRoutes);
app.use("/articles", articleRoutes);

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
