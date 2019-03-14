const Joi = require('joi');
/*
module.exports = Joi.object().keys({
  name: Joi.string().alphanum().min(2).required(),
  price: Joi.number().currency().required(),
  inventory: Joi.number().integer().min(0).max(9999)
});*/

const productSchema = (function() {
  const nameSchema = Joi.string().alphanum().required();
  // const priceSchema = Joi.number().positive().greater(1).precision(2);
  // const priceSchema = Joi.number().decimal().positive().greater(1).precision(2);
  const priceSchema = Joi.string();
  const inventorySchema = Joi.number().integer().min(0);

  const createProductSchema = Joi.object().keys({
    name: nameSchema,
    price: priceSchema.required(),
    inventory: inventorySchema.required()
  });

  const updateProductSchema = Joi.object().keys({
    name: nameSchema,
    price: priceSchema,
    inventory: inventorySchema
  });

  // return {
  //   createProductSchema,
  //   updateProductSchema
  // }
  return {
    createProductSchema
  }
})();

module.exports = {
  productSchema
};
