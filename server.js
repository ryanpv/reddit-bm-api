const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const bookmarkRouter = require("./routes/bookmarker-routes.js");
const { mongooseConn } = require("./db/db-conn.js");
const PORT = 7979


app.use(cors());
app.use(express.json());


app.use("/bookmarker", bookmarkRouter)

app.get("/client", (req, res) => {
  res.send("Hello World, welcome to home page")
})

app.listen(PORT, () => {

  console.log(`Listening on port ${ PORT }`);
});