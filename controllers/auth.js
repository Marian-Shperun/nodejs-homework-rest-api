const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../models/user");
const {
  HttpError,
  ctrlWrapper,
  // sendGridEmail,
  sendNodeMailer,
} = require("../helpers");

require("dotenv").config();

const { SECRET_KEY, BAE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url("email");
  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  sendNodeMailer({
    to: email,
    subject: "Verify yours email",
    text: "Verification",
    html: `<a href='${BAE_URL}/api/users/verify/${verificationToken}' target='_blank'>Verify yours email. click this</a>`,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong"); // "Email invalid"
  }

  if (!user.verify) {
    throw HttpError(401, "Email or password  wrong or not verify Email"); // "Not verified email"
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong"); // "Password invalid"
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ message: "Verification successful" });
};

const reVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }
  const user = await User.findOne({ email });

  if (!user.verify) {
    sendNodeMailer({
      to: email,
      subject: "Verify yours email",
      text: "Verification",
      html: `<a href='${BAE_URL}/api/users/verify/${user.verificationToken}' target='_blank'>Verification click this</a>`,
    });
    res.status(200).json({ message: "Verification email sent" });
  } else {
    throw HttpError(400, "Verification has already been passed");
  }
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  verify: ctrlWrapper(verify),
  reVerification: ctrlWrapper(reVerification),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
