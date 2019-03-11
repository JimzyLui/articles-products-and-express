
const faker = require("faker");

const createFakeProduct = ()=>({
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  inventory: faker.random.number()
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
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
/*
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      arrFakeProducts = [ { name: 'Handmade Steel Chair', price: 987.78, inventory: 50209 },
      { name: 'Generic Wooden Chips', price: 349.46, inventory: 51199 },
      { name: 'Ergonomic Granite Car',
        price: 791.84,
        inventory: 14999 },
      { name: 'Gorgeous Fresh Pizza', price: 352.49, inventory: 28218 },
      { name: 'Unbranded Fresh Chips',
        price: 261.59,
        inventory: 40741 },
      { name: 'Licensed Steel Tuna', price: 675.69, inventory: 24176 },
      { name: 'Practical Steel Pizza', price: 563.58, inventory: 3953 },
      { name: 'Tasty Cotton Salad', price: 149.48, inventory: 27872 },
      { name: 'Rustic Cotton Chicken',
        price: 832.24,
        inventory: 85147 },
      { name: 'Unbranded Metal Chicken',
        price: 530.25,
        inventory: 1613 } ];
      return knex('products').insert(arrFakeProducts);
  });
};
*/