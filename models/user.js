const mongoose = require("mongoose");
const { Schema } = mongoose;

const { handleMongooseError } = require("../helpers");

const { authSchemasValidation } = require("../validations");

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: authSchemasValidation.emailRegexp,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },

  avatarURL: String,

  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

userSchema.post("save", handleMongooseError);

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
