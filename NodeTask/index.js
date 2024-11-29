const express = require("express");
const app = express();
const cors = require("cors");
require("module-alias/register");

const userRoutes = require("./src/routes/userRoutes");
const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://erslannaveed:erslannaveed@cluster0.v11v6.mongodb.net/usersdb?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => { console.log("Connected") })
  .catch((error) => { console.log("Error:", error) });

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String },
    email: { type: String },
    job: { type: String },
});

app.use(cors()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", userRoutes);

const server = app.listen(1000, function () {
    console.log("Server is running on port 1000");
});
