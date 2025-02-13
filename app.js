const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//use middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//connect to Mongo Database
connectDB();

//route handlers
app.use("/api/auth",authRoutes);
app.use("/api/auth",userRoutes);

app.get("/", (req, res) => {
  res.json({
    msg: "MERN Project on College Club Management Web Application",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
