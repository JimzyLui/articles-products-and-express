const express = require("express");
const router = express.Router();
const knex = require('./../database/index');

const DS_Products = require("./../classes/DS_Products");

router.use("/", (req, res, next) => {
  // console.log("req.body: ", req.body);
  next();
});

router.get("/new", (req, res) => {
  console.log("launch new product screen...");
  // const p = { name: "", price: 0.0, inventory: 0 };
  res.render("productNew", {
    activeProducts: true,
    pageTitle: "Add New Product"
  });

  // res.render("productEdit", product);
});

router.post("/new", (req, res) => {
  console.log("Posting to /new...");
  const p = req.body;
  console.log("p: ", p);
  console.log("p.name: ", p.name);
  if (p.name) {
    knex('products')
      .returning('id')
      .insert({
        name: p.name,
        price: p.price,
        inventory: p.inventory
      })
      .then(()=>{
        res.redirect("/products");
      });
    // const id = DS_Products.createProduct(p.name, p.price, p.inventory);
    // const products = DS_Products.getAllProducts();
    // res.render("products", { products, activeProducts: true });
  } else {
    res.status(204).send("<h1>No content!</h1>");
  }
});

router.get("/:id/edit", (req, res) => {
  const productId = Number(req.params.id);
  if (productId) {
    knex.select().from('products')
    .where({ id: productId })
    .then((product) => {
      product = product.pop();
      // const product = DS_Products.getProductById(productId);
      console.log("product edit: rendering...");
      res.render("productEdit", {
        pageTitle: "Edit Product",
        p: product,
        activeProducts: true,
        active: true,
        msgSuccess: req.flash('success'),
        msgFail: req.flash('fail')
      });
    })
  }  
  /*
  const productId = Number(req.params.id);
  const product = DS_Products.getProductById(productId);
  console.log("product edit: rendering...");
  res.render("productEdit", {
    pageTitle: "Edit Product",
    p: product,
    activeProducts: true
  });
  */
});

router.get("/:id", (req, res) => {
  const productId = Number(req.params.id);
  if (productId) {
    knex.select().from('products')
    .where({ id: productId })
    .then((product) => {
      product = product.pop();
    // const product = DS_Products.getProductById(productId);
    console.log("product: (get: product/:id) ", product);
      res.render("productDetail", {
        p: product,
        activeProducts: true,
        pageTitle: product.name
        // pageTitle: product.name.toUpperCase()
      });
    })
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
  // DS_Products.deleteProductById(productId);
  const p = req.body;
  console.log("p: ", p);
  // const id = DS_Products.createProduct(p.name, p.price, p.inventory);

  knex('products')
    .where({id: productId})
    .update({
      name: p.name,
      price: p.price,
      inventory: p.inventory
    })
    .then(() => {
      console.log("product updated: ", productId);
      res.redirect("/products");
    // res.render("productEdit", product);
    })
});

router.put("/:id", (req, res) => {
  console.log("put!!!");
  const productId = Number(req.params.id);
  DS_Products.deleteProductById(productId);
  const p = req.body;
  console.log("p: ", p);
  const id = DS_Products.createProduct(p.name, p.price, p.inventory);
  console.log("product updated: ", id);
  res.redirect("/products");
  // res.render("productEdit", product);
});

router.post("/DELETE/:id", (req, res) => {
  console.log("delete called");
  const productId = Number(req.params.id);
  DS_Products.deleteProductById(productId);

  console.log("product deleted: ", productId);
  res.redirect("/products");
  // const products = DS_Products.getAllProducts();
  // res.render("products", { products, activeProducts: true });
});
router.delete("/:id", (req, res) => {
  console.log("delete called");
  const productId = Number(req.params.id);
  DS_Products.deleteProductById(productId);

  console.log("product deleted: ", productId);
  res.redirect("/products");
  // const products = DS_Products.getAllProducts();
  // res.render("products", { products, activeProducts: true });
});

router.get("/", (req, res) => {
  knex.select().from('products').orderBy('name')
  .then((products) => {
    console.log(products.length, 'products loaded.');
    res.render("products", {
      products,
      pageTitle: "Products",
      // hasProducts: products.length > 0,
      hasProducts: true,
      activeProducts: true
    })
  })
});
  
/*
  // const products = DS_Products.getAllProducts();
  return new Promise(
    function(resolve, reject) {
      resolve(DS_Products.getAllProducts());
    })
  .then((products)=>
  // console.log('arrProducts: ', products);
  res.render("products", {
    products,
    pageTitle: "Products",
    // hasProducts: products.length > 0,
    hasProducts: true,
    activeProducts: true
  }));
});
*/
module.exports = router;
