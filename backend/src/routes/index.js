const express = require("express");

const router = express.Router();

const { addUSer, getUsers, getUser, updateUser, deleteUser} = require("../controllers/user")
const { register, login, checkAuth } = require("../controllers/auth")
const { getWallet, getWallets } = require("../controllers/wallet")
const { auth } = require("../middleware/auth")
const {transactions, topUp, notification } = require('../controllers/transaction');

router.post("/user", addUSer);
router.get("/user", getUsers);
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

router.get("/wallet/:id", auth, getWallet)
router.get("/wallets", auth, getWallets)

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth, checkAuth)

router.get("/transactions",auth, transactions)
router.post('/topup', auth, topUp);
router.post("/notification",auth, notification);


module.exports = router