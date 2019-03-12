const tableName = "products";
exports.up = function(knex, Promise) {
  return 
  knex.schema.table(tableName, function (table) {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('modified_at').defaultTo(knex.fn.now());
  })
  .then((table)=>
    console.log(`-->Table '${tableName}' modified.`)
  );
};

exports.down = function(knex, Promise) {
  
};
