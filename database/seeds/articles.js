
const faker = require("faker");

const createFakeArticle = ()=>({
  title: faker.lorem.words(),
  body: faker.lorem.paragraphs(),
  author: faker.name.findName()
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').truncate()
    .then(function () {
      const arrFakeArticles = [];
      const iDesiredFakeArticles = 50;
      for(let i=0; i<iDesiredFakeArticles; i++){
        arrFakeArticles.push(createFakeArticle());
      }
      console.log('createFakeArticle(',iDesiredFakeArticles,'): ',arrFakeArticles.length, ' records created.');
      return knex("articles")
      .insert(arrFakeArticles)
    }); 
};


/*
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        { title: 'The Joy of Sex', body: 'The rain in Spain falls mainly on the plain.', author: 'Mahatma Ghandi'},
        { title: 'The Cat in the Hat', body: 'One fish two fish red fish blue fish.', author: 'Dr. Seuss'},
        { title: 'How to Live like a Superhero', body: "I'm afraid of heights...", author: 'Superman'},
        { title: 'My Secret', body: 'I forgot!', author: 'Secret Squirrel'},
      ]);
    });
};
*/
