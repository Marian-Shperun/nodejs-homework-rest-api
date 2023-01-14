const app = require("./app");
const { dbStart } = require("./db/connection.js");

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.CONNECTION_URL;

dbStart(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running. Use our API on port: http://localhost:${PORT}/`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
