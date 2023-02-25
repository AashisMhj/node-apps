const {memoryUsage} = require('node:process');
const express = require('express');

const routes = require('./src/routes');
const getPrivateIp = require('./src/helper/ip');
const calculatePer = require('./src/helper/percentCal');

// variables setup
const app = express();
const PORT = 5001;
const INTERVAL_PERIOD = 10 *  1000// 10 second

// app setup
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Server started at ${getPrivateIp()}:${PORT}`)
});

setInterval(()=>{
    const per = calculatePer(process.memoryUsage().heapUsed, process.memoryUsage().heapTotal);
    console.log(`Memory Usage: ${per}`)
}, INTERVAL_PERIOD)