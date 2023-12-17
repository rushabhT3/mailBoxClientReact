const express = require("express");
const cors = require("cors");

const { sequelize } = require("./util/database");
const route = require("./routes/router");

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/", route);

(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
})();
