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
$ knex migrate:latest
$ node index.js
$ knex seed:run

### Changes:
- POSTGRES_DB is now the name of the db to use.
- Connect to the DB using postbird: https://github.com/paxa/postbird
- knexfile and dotenv is used to declare credentials
