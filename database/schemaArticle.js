const Joi = require('joi');const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().alphanum().min(2).required(),
  author: Joi.string().alphanum().min(2).required(),
  body: Joi.text().alphanum().min(2).required()
});