require("dotenv").config();
const express = require("express");

// const bodyParser = require("body-parser"); // Require body-parser
const cors = require("cors");

const app = express();
// const port = 5500;

const port = process.env.PORT || 5500;
// db connection
const dbConnection = require("./db/dbconfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");
// questions routes middleware file
const questionRoute = require("./routes/questionRoute");

// answers routes middleware file
const answerRoute = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authMiddleware");
// middleware include
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// user router middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("/api/questions",authMiddleware, questionRoute);
app.use("/api/answers", authMiddleware,answerRoute);
app.get("/",(req, res)=>{
  res.send("Welcome to our API");
})
async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();



