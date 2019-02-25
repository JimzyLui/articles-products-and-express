class DS_Products {
  constructor() {
    this.storage = [];
    this.idNum = 1;
    this.initMockProducts();
  }
  sortName(a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  initMockProducts() {
    this.storage.push({
      id: this.idNum,
      name: "dog",
      price: 1000.02,
      inventory: 10
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      name: "cat",
      price: 30.99,
      inventory: 100
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      name: "rabbit",
      price: 80.34,
      inventory: 1000
    });
    this.idNum++;
  }
  getAllProducts() {
    return this.storage.slice().sort(this.sortName);
  }
  getProductById(id) {
    let result;
    // console.log("id", id);
    /*
    this.storage.forEach(product => {
      if (product.id === id) {
        result = product;
      }
    });*/
    result = this.storage.filter(x => x.id === id).pop();
    // console.log("getProductById: ", result);
    return result;
  }
  createProduct(name, price, inventory) {
    this.storage.push({ id: this.idNum, name, price, inventory });
    this.idNum++;
    console.log("createProduct: id=", this.idNum);
    return this.idNum;
  }
  deleteProductById(id) {
    this.storage.slice().forEach((product, idx) => {
      // console.log("comparing pid(", product.id, ") to id(", id, ")");
      if (product.id === id) {
        this.storage.splice(idx, 1);
        // console.log("deleteProductById: ", idx, " done.");
        return;
      }
    });
  }
}

module.exports = new DS_Products();
