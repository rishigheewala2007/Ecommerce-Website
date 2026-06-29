require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const router = require('./routes/authroutes');
const app = express();

connectDB();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;