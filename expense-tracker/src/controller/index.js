const db = require('../models')

const getTransactions = async (req, res, next) =>{
    const data = await db.Transaction.findAll()
    return res.status(200).json({
        data
    });
}

module.exports = {
    getTransactions
}