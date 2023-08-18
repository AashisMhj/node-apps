const express = require("express");
require("dotenv").config();

const routes = require("./src/routes")

const PORT = process.env.PORT || 5001;
const app = express();

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server Error'); 
}

// app setup
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));

module.exports = app;