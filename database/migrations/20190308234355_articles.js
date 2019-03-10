const tableName = 'articles';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('title',150).notNullable();
    table.text('body');
    table.string('author',100);
  }).then((table)=>
    console.log(`-->Table '${tableName}' created.`)
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
