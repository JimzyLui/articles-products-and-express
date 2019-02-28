"use strict";
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
  // convertToCurrency(num) {
  //   const curr = num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  //   return curr;
  // }
  formatToCurrency(numStr) {
    return parseFloat(numStr).toFixed(2);
  }

  formatToCurrencyx(numStr) {
    numStr += "";
    console.log("numStr: ", numStr);
    numStr = numStr.trim("0");
    const arrMoney = numStr.split(".");
    console.log("arrMoney: ", arrMoney);
    let dollars = arrMoney[0];
    let cents = "0.00";
    switch (arrMoney.length) {
      case 0:
        return 0.0;
        break;
      case 1:
        dollars = Number.parseFloat(dollars + ".00").toFixed(2);
        console.log("dollars: ", dollars);
        return dollars;
        break;
      case 2:
        cents = "." + arrMoney[1];
        cents = Number.parseFloat(cents)
          .toFixed(2)
          .toString();
        console.log("cents: ", cents);

        break;
      default:
        return 0.0;
        break;
    }
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(dollars)) {
      dollars = dollars.replace(rgx, "$1" + "," + "$2");
    }
    console.log("dollars: ", dollars);
    console.log("cents: ", cents);
    dollars += cents;
    return Number.parseFloat(dollars).toFixed(2);
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
    const currency = this.formatToCurrency(price).toString();
    console.log("currency: ", currency);
    this.storage.push({
      id: this.idNum,
      name: name,
      price: currency,
      inventory: inventory
    });
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
