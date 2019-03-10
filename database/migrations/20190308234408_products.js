/*
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name',100).notNullable();
    table.decimal('price',8,2).notNullable().default(0.0);
    table.integer('inventory').notNullable().default(0);
  });
}; */
const tableName = 'products';
exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name',100).notNullable();
    table.decimal('price',8,2).notNullable().default(0.0);
    table.integer('inventory').notNullable().default(0);
  }).then((table)=>
    console.log(`-->Table '${tableName}' created.`)
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};

