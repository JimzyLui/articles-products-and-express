const express = require("express");
const router = express.Router();

// const DS_Articles = require("../classes/DS_Articles");
const Articles = require("../classes/Articles");

router.use("/", (req, res, next) => {
  // console.log("req.body: ", req.body);
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
    Articles.createArticle(p)
    .then((id)=>{
      const msg = `New Article ${p.title} added.`;
      console.log(msg);
      req.flash('success', msg); 
      res.redirect("/articles");
    });
  } else {
    res.status(204).send("<h1>No content!</h1>");
  }
});

router.get("/:id/edit", (req, res) => {
  const articleId = Number(req.params.id);
  Articles.getArticleById(articleId)
  .then((article)=>{
    console.log("article edit: rendering...");
    article = article.pop();
    res.render("articleEdit", {
      pageTitle: "Edit Article",
      p: article,
      activeArticles: true
    });
  });
});

router.get("/:id", (req, res) => {
  const articleId = Number(req.params.id);
  if (articleId) {
    Articles.getArticleById(articleId)
    .then((article)=>{
      // console.log("article: (get: article/:id) ", article);
      article = article.pop();
      res.render("articleDetail", {
        p: article,
        activeArticles: true,
        pageTitle: article.title.toUpperCase()
      });
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
  const p = req.body;
  p['id']=articleId;
  // const p = req.params;
  console.log('/update/: ',p);
  
  Articles.updateArticle(p)
    .then((bSuccess)=>{
      console.log('bSuccess : ',bSuccess);
      if(bSuccess){
        const msg = `Article #${articleId} "${p.title}" updated.`;
        console.log(msg);
        req.flash('success', msg); 
        res.redirect("/articles");
      }else{
        const msg = `Error: article# ${articleId} was not updated!`;
        console.log(msg);
        req.flash('fail', msg);  
      }
    });
});

router.put("/:id", (req, res) => {
  console.log("put!!!");
  const articleId = Number(req.params.id);
  const p = req.body;

  Articles.updateArticle(p)
  .then(()=>{
    const msg = `Article #${articleId} "${p.title}" updated.`;
    console.log(msg);
    req.flash('success', msg);  
    res.redirect("/articles");
  });
});

router.post("/DELETE/:id", (req, res) => {
  // console.log("delete called");
  const articleId = Number(req.params.id);
  Articles.deleteArticleById(articleId)
    .then((bSuccess)=>{
      // console.log('bSuccess : ',bSuccess);
      if(bSuccess){
        const msg = `article# ${articleId} deleted!`;
        console.log(msg);
        req.flash('success', msg);  
        res.redirect(`/articles`);
      }else{
        const msg = `Error: article# ${articleId} was not deleted!`;
        console.log(msg);
        req.flash('fail', msg);  
      }
    });
});





router.delete("/:id", (req, res) => {
  console.log("delete called");
  const articleId = Number(req.params.id);
  Articles.deleteArticleById(articleId)
    .then((articleId)=>{
      console.log("article deleted: ", articleId);
      res.redirect("/articles");
  });
});

router.get("/",(req, res) => {
  // console.log('xxx: ',req.flash('success').pop());
  Articles.getAllArticles()
  .then((articles)=>{
    res.render("articles", {
      articles,
      pageTitle: "Articles",
      hasArticles: articles.length > 0,
      activeArticles: true,
      active: true,
      msgSuccess: req.flash('success'),
      msgFail: req.flash('fail')
    });
    // delete res.session.msg;
  });
});

module.exports = router;
