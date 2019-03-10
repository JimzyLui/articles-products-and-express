- Make docker-compose.yml file
- Create .env file
  - set POSTGRES_DB to database name
$ docker-compose up
  (use docker-compose down -v) to reset
$ npm i --save knex
$ npm i --save dotenv  
$ npm i --save pg  
$ npm i --save faker  
$ npm i --save
$ knex init
$ knex migrate:make 'tableName'
$ knex migrate:latest --env development
$ knex migrate:rollback --env development
$ node index.js
$ knex seed: make 'tableName'
$ knex seed:run

### Changes:
- POSTGRES_DB is now the name of the db to use.
- Connect to the DB using postbird: https://github.com/paxa/postbird
- knexfile and dotenv is used to declare credentials


...to find out where the config file is for psql:
pg_config --sysconfdir