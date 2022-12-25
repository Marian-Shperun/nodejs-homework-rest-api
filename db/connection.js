const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbStart = (URL) => {
  const setConnection = mongoose
    .set("strictQuery", true)
    .connect(URL, options)
    .then(() => {
      console.log("Database connection successful");
    });
  return setConnection;
};

module.exports = {
  dbStart,
};
