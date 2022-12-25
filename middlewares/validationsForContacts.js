const Joi = require("joi");

const contactValidation = (req, res, next) => {
  const body = req.body;

  if (!body.favorite) {
    body.favorite = false;
  }

  const schema = Joi.object({
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

  const { error } = schema.validate(body);
  if (error) {
    const erorMessage = Object.values(error.message)
      .filter((el) => el !== '"')
      .join("");
    return res.status(400).send({ message: `${erorMessage} ` });
  }
  next();
};

const contactUpdateValidation = (req, res, next) => {
  const body = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string()
      .pattern(/^[+]*[-\s./0-9]*$/, {
        name: "numbers",
      })
      .min(9),
    favorite: Joi.bool(),
  });
  const { error } = schema.validate(body);
  if (error) {
    const erorMessage = Object.values(error.message)
      .filter((el) => el !== '"')
      .join("");
    return res.status(400).send({ message: `${erorMessage} ` });
  }
  next();
};

module.exports = { contactValidation, contactUpdateValidation };
