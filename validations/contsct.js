const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[+]*[-\s./0-9]*$/, {
      name: "numbers",
    })
    .min(9)
    .required(),
  favorite: Joi.bool().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .pattern(/^[+]*[-\s./0-9]*$/, {
      name: "numbers",
    })
    .min(9),
  favorite: Joi.bool(),
});

module.exports = { addContactSchema, updateContactSchema };
