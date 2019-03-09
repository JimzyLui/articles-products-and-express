exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('name',50).notNullable();
    table.decimal('price',8,2).notNullable().default(0.0);
    table.integer('inventory').notNullable().default(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
