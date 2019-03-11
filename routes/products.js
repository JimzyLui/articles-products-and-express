const express = require("express");
const router = express.Router();

const Products = require("./../classes/Products");

router.use("/", (req, res, next) => {
  next();
});

router.get("/new", (req, res) => {
  console.log("launch new product screen...");
  res.render("productNew", {
    activeProducts: true,
    pageTitle: "Add New Product"
  });
});

router.post("/new", (req, res) => {
  console.log("Posting to /new...");
  const p = req.body;
  console.log("p: ", p);
  console.log("p.name: ", p.name);
  if (p.name) {
    Products.createProduct(p)
    .then((id)=>{
      const msg = `New Product ${p.name} added.`;
      console.log(msg);
      req.flash('success', msg); 
      res.redirect("/articles");
    });
  } else {
    res.status(204).send("<h1>No content!</h1>");
  }
});


router.get("/:id/edit", (req, res) => {
  const productId = Number(req.params.id);
  if (productId) {
    Products.getProductById(productId)
      .then((product)=>{
        console.log("product edit: rendering...");
        product = product.pop();
        res.render("productEdit", {
          pageTitle: "Edit Product",
          p: product,
          activeProducts: true
        });
      });
  }
});


router.get("/:id", (req, res) => {
  const productId = Number(req.params.id);
  if (productId) {
    Products.getProductById(productId)
    .then((product)=>{
      product = product.pop();
      res.render("productDetail", {
        p: product,
        activeProducts: true,
        pageTitle: product.title.toUpperCase()
      });
    });
  } else {
    res.render("productNew", {});
    res.send("No such id exists.");
  }
});

router.post("/:id", (req, res, next) => {
  console.log("post -> put");
  redirect("/products/:id");
  // next();
});

router.post("/UPDATE/:id", (req, res) => {
  console.log("put!!!");
  const productId = Number(req.params.id);
  const p = req.body;
  p['id']=productId;
  console.log("p: ", p);

  Products.updateProduct(p)
    .then((bSuccess)=>{
      console.log('bSuccess : ',bSuccess);
      if(bSuccess){
        const msg = `Product #${productId} "${p.name}" updated.`;
        console.log(msg);
        req.flash('success', msg); 
        res.redirect("/products");
      }else{
        const msg = `Error: product# ${productId} was not updated!`;
        console.log(msg);
        req.flash('fail', msg);  
      }
    });
});

router.put("/:id", (req, res) => {
  console.log("put!!!");
  const productId = Number(req.params.id);
  const p = req.body;
  p['id']=productId;
  console.log("p: ", p);

  Products.updateProduct(p)
    .then(()=>{
      const msg = `Product #${productId} "${p.name}" updated.`;
      console.log(msg);
      req.flash('success', msg);  
      res.redirect("/products");
  });
});

router.post("/DELETE/:id", (req, res) => {
  // console.log("delete called");
  const productId = Number(req.params.id);
  Products.deleteProductById(productId)
  .then((bSuccess)=>{
    if(bSuccess){
      const msg = `product# ${productId} deleted!`;
      console.log(msg);
      req.flash('success', msg);  
      res.redirect(`/products`);
    }else{
      const msg = `Error: product# ${productId} was not deleted!`;
      console.log(msg);
      req.flash('fail', msg);  
    }
  });
});


router.delete("/:id", (req, res) => {
  console.log("delete called");
  const productId = Number(req.params.id);
  Products.deleteProductById(productId);

  console.log("product deleted: ", productId);
  res.redirect("/products");
});

router.delete("/:id", (req, res) => {
  // console.log("delete called");
  const productId = Number(req.params.id);
  Products.deleteProductById(productId)
    .then((productId)=>{
      console.log("product deleted: ", productId);
      res.redirect("/products");
  });
});



router.get("/",(req, res) => {
  Products.getAllProducts()
  .then((products)=>{
    res.render("products", {
      products,
      pageTitle: "Products",
      hasProducts: products.length > 0,
      activeProducts: true,
      active: true,
      recordsFound: products.length,
      msgSuccess: req.flash('success'),
      msgFail: req.flash('fail')
    });
  });
});

module.exports = router;
