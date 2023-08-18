const db = require('../models')
const TRANSACTION_PUBLIC_ATTRIBUTES = ["id", "title", "amount","createdAt", "expense_type"]


const getTransactions = async (req, res, next) =>{
    const {expense_type} = req.query;
    const data = await db.Transaction.findAll({attributes: TRANSACTION_PUBLIC_ATTRIBUTES});
    if(data.length > 0){
        return res.status(200).json({
            data
        });
    }
    return res.status(204).json({
        msg:"No Transactions"
    })
}

const getSingleTransaction = async (req, res) =>{
    const {id} = req.params;
    const post = await db.Transaction.findOne({
        attributes: TRANSACTION_PUBLIC_ATTRIBUTES,
        where: {id: id}
    });
    if(post) {
        return res.status(200).json({
            msg: "Successful",
            data: post
        });
    }
    return res.status(404).json({
        msg: "Transaction Not Found"
    })
}

const addTransactions = async (req, res) =>{
    const {title, expense_type, amount} = req.body;
    await db.Transaction.create({
        title,
        expense_type,
        amount
    });

    return res.status(201).json({
        msg: "Transaction Added"
    })
}

const updateTransactions = async (req, res) =>{
    const {title, expense_type, amount} = req.body;
    const {id} = req.params;
    const updated_at = Date.now();
    const [updated] = await db.Transaction.update({title, expense_type, amount, updated_at},{
        where: {id},
    });
    if(updated){
        return res.status(201).json({
            msg: "Post Updated"
        });
    }
    return res.status(404).json({
        msg: "Transaction Not Found"
    })
}

const deleteTransaction = async (req, res) =>{
    const {id} = req.params;
    const post = await db.Transaction.findOne({id});
    if(post){
        await post.destroy();
        return res.status(200).json({
            msg: "Transaction Deleted"
        })
    }

    return res.status(404).json({
        msg: "Transaction Not Found"
    })
}

module.exports = {
    getTransactions,
    addTransactions,
    updateTransactions,
    getSingleTransaction,
    deleteTransaction
}