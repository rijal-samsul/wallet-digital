const express = require("express");

const router = express.Router();

const { addUSer, getUsers, getUser, updateUser, deleteUser} = require("../controllers/user")
const { register, login } = require("../controllers/auth")
const { auth } = require("../middleware/auth")

router.post("/user", addUSer);
router.get("/user", getUsers);
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

router.post("/register", register)
router.post("/login", login)

module.exports = router