exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', (table) => {
    table.increments();
    table.string('title',50).notNullable();
    table.text('body');
    table.string('author',100);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
