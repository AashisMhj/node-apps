const router = require("express").Router();
const {getTransactions} = require("../controller/")

router.get('/transactions',getTransactions );

module.exports = router;