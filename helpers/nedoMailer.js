const nodemailer = require("nodemailer");

require("dotenv").config();

const { NODE_MAILER_HOST, META_EMAIL, META_PASSWORD } = process.env;
const config = {
  host: NODE_MAILER_HOST,
  port: 465, // 25, 465, 2255
  secure: true, // encryption 465
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendNodeMailer = (data) => {
  const mail = {
    from: META_EMAIL,
    ...data,
  };

  transporter
    .sendMail(mail)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = sendNodeMailer;
