const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const morgan = require('morgan');
const { createHandler } = require('graphql-http/lib/use/express');
require('dotenv').config();
//
const schema = require('./schema');

// variables
const PORT = process.env.PORT || 5001;
const app = express();

// app config
app.use(cors());
app.use(morgan('common'));

app.all('/graphql', createHandler({
    schema
}))


app.listen({ port: PORT });
console.log('Server started at port: '+PORT)