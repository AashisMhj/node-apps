const router = require("express").Router();
const {getTransactions, addTransactions, updateTransactions, getSingleTransaction, deleteTransaction} = require("../controller/")

router.get('/transactions',getTransactions );
router.get('/transactions/:id', getSingleTransaction);
router.post('/transactions', addTransactions);
router.put('/transactions/:id', updateTransactions);
router.delete('/transactions/:id', deleteTransaction);


module.exports = router;