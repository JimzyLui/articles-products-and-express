// const fx = require("../functions");
const knex = require('../database');

class Articles {
  constructor() {
  }

  toTitleCase(str) {
    var i, j, str, lowers, uppers;
    str = str.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = [
      "A",
      "An",
      "The",
      "And",
      "But",
      "Or",
      "For",
      "Nor",
      "As",
      "At",
      "By",
      "For",
      "From",
      "In",
      "Into",
      "Near",
      "Of",
      "On",
      "Onto",
      "To",
      "With"
    ];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"), function(
        txt
      ) {
        return txt.toLowerCase();
      });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ["Id", "Tv"];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(
        new RegExp("\\b" + uppers[i] + "\\b", "g"),
        uppers[i].toUpperCase()
      );

    return str;
  }

  getAllArticles() {
    return knex.select()
      .from('articles')
      .orderBy('title')
      .map(x => {
        x.title = this.toTitleCase(x.title);
        return x;
      });
  }

  getArticleById(id) {
    return knex.select()
      .from('articles')
      .where({id: id});
  }

  createArticle(p) {
    p.title = this.toTitleCase(p.title);
    return knex('articles')
      .returning('id')
      .insert({
        title: p.title,
        author: p.author,
        body: p.body
      })
      .then((id)=>{
        return id;
      });
  }

  updateArticle(p) {
    console.log('p update: ',p);
    // return true;
    
    return knex('articles').update({
      title: p.title,
      author: p.author,
      body: p.body
    })
    .where({id: p.id})
    .then((updatedRows) => {
      console.log('updatedRows: ',updatedRows);
      return updatedRows===1;
    })
    .catch((err) => {
      console.error('Failed to update', err);
      return Promise.reject(err);
    });
  }

  deleteArticleById(id) {
    return knex('articles')
      .where({id: id})
      .del() 
      .then(()=>{
        // console.log('deleted!')
        return true})   
      // .then((updatedRows) => {
      //   console.log('updatedRows: ',updatedRows);
      //   return updatedRows===1;
      // })
      .catch((err) => {
        console.error('Failed to delete', err);
        return Promise.reject(err);
      });
  }
}

module.exports = new Articles();
