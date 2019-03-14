const tableName = 'comments';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('devNoteId').notNullable().references('devnotes.id');
    table.text('body');
    table.string('author',100);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('voided_at').defaultTo(knex.fn.now());
  }).then((table)=>
    console.log(`-->Table '${tableName}' created.`)
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
