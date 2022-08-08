const express = require("express");

const router = express.Router();

const { addUSer, getUsers, getUser, updateUser, deleteUser} = require("../controllers/user")
const { register, login, checkAuth } = require("../controllers/auth")
const { getWallet, updateWallet, getWallets } = require("../controllers/wallet")
const { auth } = require("../middleware/auth")
const { transaction, transactions } = require('../controllers/transaction');

router.post("/user", addUSer);
router.get("/user", getUsers);
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

router.get("/wallet/:id", auth, getWallet)
router.get("/wallets", auth, getWallets)
router.patch("/wallet", auth, updateWallet)

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth, checkAuth)

router.post('/transaction', auth, transaction);
router.get('/transactions', auth, transactions);


module.exports = router