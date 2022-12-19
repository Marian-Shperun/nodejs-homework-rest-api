const Joi = require("joi");

const contactValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string()
      .pattern(/^[+]*[-\s./0-9]*$/, {
        name: "numbers",
      })
      .min(9)
      .required(),
  });
  return schema.validate(data);
};
const contactUpdateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string()
      .pattern(/^[+]*[-\s./0-9]*$/, {
        name: "numbers",
      })
      .min(9),
  });
  return schema.validate(data);
};

module.exports = { contactValidation, contactUpdateValidation };
