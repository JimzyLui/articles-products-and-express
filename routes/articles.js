const express = require("express");
const router = express.Router();

const DS_Articles = require("./../db/DS_Articles");

router.get("/articles", (req, res) => {
  const articles = DS_Articles.getAllArticles();
  res.render("articles", { articles, activeArticles: true });
});

router.get("/article/:id", (req, res) => {
  const articleId = Number(req.params.id);
  console.log("articleId", articleId);

  const article = DS_Articles.getArticleById(articleId);
  console.log("article", article);
  res.render("articleDetail", { article, activeArticles: true });
});

module.exports = router;
