const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const bookmarkRouter = require("./routes/bookmarker-routes.js");
const { mongooseConn } = require("./db/db-conn.js");
const firebaseRouter = require("./routes/firebase-routes.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("./firebase-config.js")

const PORT = 7979

app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "http://localhost:7979",
  ],
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoDBStore({
    uri: process.env.DB_URI,
    collection: "redditAppSessions",
  }),
}));


app.use("/bookmarker", bookmarkRouter)
app.use("/users", firebaseRouter)

app.get("/client", (req, res) => {
  res.send("Hello World, welcome to home page")
})

app.listen(PORT, () => {
  mongooseConn
  console.log(`Listening on port ${ PORT }`);
});