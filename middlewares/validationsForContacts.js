const { contactValidate } = require("../validations");

const contactValidation = (req, res, next) => {
  const body = req.body;

  if (!body.favorite) {
    body.favorite = false;
  }
  const { error } = contactValidate.addContactSchema.validate(body);
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

  const { error } = contactValidate.updateContactSchema.validate(body);
  if (error) {
    const erorMessage = Object.values(error.message)
      .filter((el) => el !== '"')
      .join("");
    return res.status(400).send({ message: `${erorMessage} ` });
  }
  next();
};

const validateContacts = {
  contactValidation,
  contactUpdateValidation,
};
module.exports = validateContacts;
