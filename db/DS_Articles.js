class DS_Articles {
  constructor() {
    this.storage = [];
    this.idNum = 1;
    this.initMockArticles();
  }
  initMockArticles() {
    this.storage.push({
      id: this.idNum,
      title: "doggy days",
      body: "This is an article about dogs",
      author: "Snoopy"
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      title: "Being catty in a cat house",
      body: "This is an article about cats",
      author: "Kitty Kat"
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      title: "Hopping Down the Bunny Trail",
      body: "This is an article about rabbits",
      author: "Roger Rabbit"
    });
    this.idNum++;
  }
  getAllArticles() {
    return this.storage.slice();
  }
  getArticleById(id) {
    let result;
    console.log("id", id);
    this.storage.forEach(article => {
      if (article.id === id) {
        result = article;
      }
    });
    console.log("result", result);
    return result;
  }
  createArticle(title, body, author) {
    this.storage.push({ id: this.idNum, title, body, author });
    this.idNum++;
  }
  deleteArticleById(id) {
    this.storage.slice().forEach((article, idx) => {
      if (article.id === id) {
        this.storage.splice(idx, 1);
      }
    });
  }
}

module.exports = new DS_Articles();
