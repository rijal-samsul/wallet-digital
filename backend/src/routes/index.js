const express = require("express");

const router = express.Router();

const { addUSer, getUsers, getUser, updateUser, deleteUser} = require("../controllers/user")
const { register, login, checkAuth } = require("../controllers/auth")
const { getWallet, updateWallet } = require("../controllers/wallet")
const { auth } = require("../middleware/auth")

router.post("/user", addUSer);
router.get("/user", getUsers);
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

router.get("/wallet", auth, getWallet)
router.patch("/wallet", auth, updateWallet)

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth, checkAuth)

module.exports = router