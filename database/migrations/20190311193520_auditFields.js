const tableName = 'auditfields';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('auditEventId').notNullable().references('auditevents.id');
    table.string('fieldName',100).notNullable();
    table.enum('changeType',['Add','Clear','Update']).notNullable();  //add, clear, update
    table.text('valOld');
    table.text('valNew');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  }).then((table)=>
    console.log(`-->Table '${tableName}' created.`)
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
