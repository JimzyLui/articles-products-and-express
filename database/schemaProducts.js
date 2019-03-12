const Joi = require('joi');
/*
module.exports = Joi.object().keys({
  name: Joi.string().alphanum().min(2).required(),
  price: Joi.number().currency().required(),
  inventory: Joi.number().integer().min(0).max(9999)
});*/

const productSchema = (function() {
  const nameSchema = Joi.string().alphanum().required();
  const priceSchema = Joi.number().min(0.00);
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

  return {
    createProductSchema,
    updateProductSchema
  }

})();

module.exports = {
  productSchema: productSchema
};
