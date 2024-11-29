require("module-alias/register");
const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

// CRUD Routes
router.get("/", user.users); // Fetch all users
router.get("/user/:id", user.getUser); // Fetch a single user by ID
router.post("/adduser", user.addUser); // Add a new user
router.get("/deleteuser/:id", user.deleteuser); // Delete a user by ID
router.post("/updateUser", user.updateUser); // Update a user by ID

module.exports = router;