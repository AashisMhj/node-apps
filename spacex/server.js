const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
//
const schema = require('./schema');

// variables
const PORT = process.env.PORT || 5001;
const app = express();

// app config
app.use(cors());
app.use(morgan('common'));
app.use('/', graphqlHTTP({
    schema,
    graphiql: true // for the ui of graphql
}));

app.listen(PORT, ()=> console.log(`Server Started at ${PORT}`));