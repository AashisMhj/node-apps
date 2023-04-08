require('dotenv').config();
const express = require('express');
const fs = require('fs');
const keys = require('./config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
const exphbs = require('express-handlebars');
const cors = require('cors');

let rawData = fs.readFileSync('./datas/index.json');
let data = JSON.parse(rawData);
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));
// app routes
// views
app.get('/', (_, res)=>{
    res.render('index', {
        data: data.data
    });
});
app.get('/book/:id', (req, res) =>{
    const {id} = req.params;
    res.render('detail', {
        stripePublishableKey: keys.stripePublishableKey,
        data: data.data.find((item) => item.id == id) || {id: '', title: '', image: '', price: 0 }
    })
});

// api
app.get('/api/books', (req, res)=>{
    return res.status(200).json({
        data: data.data
    });
});

app.get('/api/books/:id', (req, res) =>{
    const {id} = req.params;
    const book = data.data.find((item) => item.id == id);
    if(!book){
        return res.status(404).json({
            msg: 'No Book of given id'
        });
    }
    return res.status(200).json({
        data: book
    })
})

app.post('/api/charge', async(req, res)=>{
    const {product_id} = req.body;
    const product = data.data.find(item => item.id == product_id);
    if(!product){
        return res.status(400).json({
            msg: 'No Book with given ID'
        });
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title
                    },
                    unit_amount: product.price
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${process.env.FRONT_END_URL}/success`,
        cancel_url: `${process.env.FRONT_END_URL}/`
    });
    return res.status(200).json({
        id: session.id
    });
})
//
app.post('/charge', (req, res) =>{
    const amount = 2500;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Web Development',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charges => res.render('success'))
    .catch((err) => {
        res.status(500).json({
            msg: 'Server Error'
        })
    })
})




app.listen(PORT, ()=>{
    console.log(`Server Started at: ${PORT}`);
})