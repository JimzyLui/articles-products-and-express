
const faker = require("faker");

const createFakeProduct = ()=>({
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  inventory: faker.random.number()
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').truncate() 
    .then(function () {
      const arrFakeProducts = [];
      const iDesiredFakeProducts = 50;
      for(let i=0; i<iDesiredFakeProducts; i++){
        arrFakeProducts.push(createFakeProduct());
      };
      console.log('createFakeProduct(',iDesiredFakeProducts,'): ',arrFakeProducts.length, ' records created.');

      return knex("products")
      .insert(arrFakeProducts)
    }); 
};

/*
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'soup', price: 8.88, inventory: 10 },
        { name: 'sandwich', price: 13.54, inventory: 88 },
        { name: 'bread', price: 5.00, inventory: 50 },
        { name: 'candy', price: 3.25, inventory: 340 }
      ]);
    });
};
*/
