"use strict";

const knex = require('../database');

class Product {
  /*
  constructor(name, price, inventory) {
    const obj = {
      name: name,
      price: price,
      inventory: inventory
    };
    return this.createProduct(obj);
  }*/
  constructor() {
  }

 


  getAllProducts() {
    return knex.select()
      .from('products')
      .then((products) => {
        console.log(products.length, 'products loaded.');
        return products;
      });
  }
  
  getProductById(id) {
    return knex.select()
      .from('products')
      .where({id: id});
  }

  getProductsBySearch(strSearch) {
    const qrySearch = '%'+strSearch+'%';
    return knex.select()
      .from('products')
      .where('name','ilike',qrySearch);
  }

  // createProduct(name, price, inventory) {
  createProduct(p) {
    const currency = this.formatToCurrency(p.price).toString();
    console.log("currency: ", currency);
    return knex('products')
      .returning('id')
      .insert({
        name: p.name,
        price: p.price,
        inventory: p.inventory
      })
      .then((id)=>{
        return id;
      });
  }


  updateProduct(p) {
    console.log('p update: ',p);
    // return true;
    
    return knex('products').update({
      name: p.name,
      price: p.price,
      inventory: p.inventory
    })
    .where({id: p.id})
    .then((updatedRows) => {
      console.log('updatedRows: ',updatedRows);
      return updatedRows===1;
    })
    .catch((err) => {
      console.error('Failed to update', err);
      return Promise.reject(err);
    });
  }

  deleteProductById(id) {
    return knex('products')
      .where({id: id})
      .del()
      .then(()=>{
        return true})
      .catch((err) =>{
        console.error('Failed to delete',err);
        return Promise.reject(err);
      });
  }
}

module.exports = new Product();
