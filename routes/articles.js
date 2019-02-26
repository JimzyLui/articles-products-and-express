const express = require("express");
const router = express.Router();

const DS_Articles = require("../db/DS_Articles");

router.use("/", (req, res, next) => {
  console.log("req.body: ", req.body);
  next();
});

router.get("/new", (req, res) => {
  console.log("launch new article screen...");
  // const p = { title: "", author: "", body: "" };
  res.render("articleNew", {
    activeArticles: true,
    pageTitle: "Add New Article"
  });

  // res.render("articleEdit", article);
});

router.post("/new", (req, res) => {
  console.log("Posting to /new...");
  const p = req.body;
  console.log("p: ", p);
  console.log("p.title: ", p.title);
  if (p.title) {
    const id = DS_Articles.createArticle(p.title, p.author, p.body);
    res.redirect("/articles");
    // const articles = DS_Articles.getAllArticles();
    // res.render("articles", { articles, activeArticles: true });
  } else {
    res.status(204).send("<h1>No content!</h1>");
  }
});

router.get("/:id/edit", (req, res) => {
  const articleId = Number(req.params.id);
  const article = DS_Articles.getArticleById(articleId);
  console.log("article edit: rendering...");
  res.render("articleEdit", {
    pageTitle: "Edit Article",
    p: article,
    activeArticles: true
  });
});

router.get("/:id", (req, res) => {
  const articleId = Number(req.params.id);
  if (articleId) {
    const article = DS_Articles.getArticleById(articleId);
    // console.log("article: (get: article/:id) ", article);
    res.render("articleDetail", {
      p: article,
      activeArticles: true,
      pageTitle: article.title.toUpperCase()
    });
  } else {
    res.render("articleNew", {});
    res.send("No such id exists.");
  }
});

router.post("/:id", (req, res, next) => {
  console.log("post -> put");
  redirect("/articles/:id");
  // next();
});

router.post("/UPDATE/:id", (req, res) => {
  console.log("put!!!");
  const articleId = Number(req.params.id);
  DS_Articles.deleteArticleById(articleId);
  const p = req.body;
  // console.log("p: ", p);
  const id = DS_Articles.createArticle(p.title, p.author, p.body);
  console.log("article updated: ", id);
  res.redirect("/articles");
  // res.render("articleEdit", article);
});

router.put("/:id", (req, res) => {
  console.log("put!!!");
  const articleId = Number(req.params.id);
  DS_Articles.deleteArticleById(articleId);
  const p = req.body;
  // console.log("p: ", p);
  const id = DS_Articles.createArticle(p.title, p.author, p.body);
  console.log("article updated: ", id);
  res.redirect("/articles");
  // res.render("articleEdit", article);
});

router.post("/DELETE/:id", (req, res) => {
  console.log("delete called");
  const articleId = Number(req.params.id);
  DS_Articles.deleteArticleById(articleId);

  console.log("article deleted: ", articleId);
  res.redirect("/articles");
  // const articles = DS_Articles.getAllArticles();
  // res.render("articles", { articles, activeArticles: true });
});
router.delete("/:id", (req, res) => {
  console.log("delete called");
  const articleId = Number(req.params.id);
  DS_Articles.deleteArticleById(articleId);

  console.log("article deleted: ", articleId);
  res.redirect("/articles");
  // const articles = DS_Articles.getAllArticles();
  // res.render("articles", { articles, activeArticles: true });
});

router.get("/", (req, res) => {
  const articles = DS_Articles.getAllArticles();
  res.render("articles", {
    articles,
    pageTitle: "Articles",
    hasArticles: articles.length > 0,
    activeArticles: true
  });
});

module.exports = router;
