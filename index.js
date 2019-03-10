const knex = require('./database/index');
// const knex = require('knex')({client: 'pg'});
// var pg = require('knex')({client: 'pg'});
// const config = require('./knexfile.js');
// const knex = require('knex')(config);

knex.select().from('products')
.then((products) => {
  console.log(products);
  process.exit();
})

.then(
knex.select().from('articles')
.then((articles) => {
  console.log(articles);
  process.exit();
}));
