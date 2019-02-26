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
      author: "Snoopy",
      body:
        "Ut euismod libero et ante aliquam convallis. Vestibulum cursus dictum nibh, nec pellentesque ligula pellentesque id. Nulla eleifend ante id est fermentum mattis. Phasellus quis facilisis enim. Phasellus non elit finibus orci mollis ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae diam laoreet, aliquam ante quis, blandit nibh. Morbi posuere venenatis mi, rutrum dictum libero vestibulum eget."
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      title: "Being catty in a cat house",
      author: "Kitty Kat",
      body:
        "Nullam scelerisque odio a ultricies ullamcorper. Phasellus pulvinar eu est pretium iaculis. Sed viverra et orci at elementum. Proin arcu tellus, dapibus eu ex nec, dapibus porta nunc. Donec ut porta massa. Quisque est ipsum, imperdiet ac dapibus sed, pretium quis dolor. Nam porta felis erat, non cursus sapien vulputate sit amet. Curabitur ac purus at turpis tincidunt gravida. Ut non orci metus. Pellentesque eu purus enim. Cras ac ligula lorem. Nulla non euismod urna. Nulla non magna dapibus, varius ligula ac, varius diam. Quisque convallis rhoncus quam, in tincidunt lacus tempor sit amet. Aenean risus ex, pulvinar convallis maximus id, pharetra vel enim. Sed in velit id dolor luctus convallis non non quam."
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      title: "Hopping Down the Bunny Trail",
      author: "Roger Rabbit",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia dolor ac magna sagittis, ut placerat elit suscipit. Duis finibus ultricies feugiat. Cras vestibulum vestibulum rutrum. Sed eu urna ligula. Duis arcu elit, semper rutrum tempor in, faucibus a justo. Integer sed lacus id lorem pretium elementum eu eget lorem. Quisque id purus mattis, bibendum neque id, faucibus ligula. Nunc condimentum dui sit amet odio laoreet feugiat."
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
    // console.log("result", result);
    return result;
  }
  createArticle(title, author, body) {
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
