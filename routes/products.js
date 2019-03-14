const express = require("express");
const router = express.Router();

const Product = require("../classes/Product");

// import { productSchema } from './../database/schemaProducts.js';
const productSchema = require('./../database/schemaProduct.js');

// import {createProductSchema, updateProductSchema} from './../database/schemaProduct.js';


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
  productSchema.createProductSchema.validate(req.body, {abortEarly: false})
    .then(validatedChanges =>{
      const p = req.body;
      console.log("p: ", p);
      console.log("p.name: ", p.name);
      Product.createProduct(p)
        .then((id)=>{
          const msg = `New Product ${p.name} added.`;
          console.log(msg);
          req.flash('success', msg); 
          res.redirect("/articles");
        });
    })
    .catch(validationError => {
      const errorMessage = validationError.details.map(d => d.message);
      res.status(400).send(errorMessage);
  });
});




router.post("/UPDATE/:id", (req, res) => {
  console.log("put!!!");
  const productId = Number(req.params.id);
  const p = req.body;
  p['id']=productId;
  console.log("p: ", p);

  Product.updateProduct(p)
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

  Product.updateProduct(p)
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
  Product.deleteProductById(productId)
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
  Product.deleteProductById(productId);

  console.log("product deleted: ", productId);
  res.redirect("/products");
});

router.delete("/:id", (req, res) => {
  // console.log("delete called");
  const productId = Number(req.params.id);
  Product.deleteProductById(productId)
    .then((productId)=>{
      console.log("product deleted: ", productId);
      res.redirect("/products");
  });
});


router.get("/SEARCH/",(req, res) => {
  const strSearch = req.query.search;
  // console.log('inside search!');
  // console.log('strSearch: ',strSearch);

  Product.getProductsBySearch(strSearch)
  .then((products)=>{
    res.render("products", {
      products,
      pageTitle: "Products",
      hasProducts: products.length > 0,
      activeProducts: true,
      active: true,
      mode: 'search',
      strSearch: strSearch,
      recordsFound: products.length,
      msgSuccess: req.flash('success'),
      msgFail: req.flash('fail')
    });
  });
});


router.get("/:id/edit", (req, res) => {
  const productId = Number(req.params.id);
  if (productId) {
    Product.getProductById(productId)
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
    Product.getProductById(productId)
    .then((product)=>{
      product = product.pop();
      res.render("productDetail", {
        p: product,
        activeProducts: true,
        pageTitle: product.title
      });
    });
  } else {
    res.render("productNew", {});
    res.send("No such id exists.");
  }
});


/*
router.post("/:id", (req, res, next) => {
  console.log(req.params);
  console.log("post -> put");
  redirect("/products/:id");
  // next();
});*/

router.get("/",(req, res) => {
  Product.getAllProducts()
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
