const express = require("express");

const routes = require("./src/routes");
const getPrivateIp = require("./src/helper/ip");
const calculatePer = require("./src/helper/percentCal");
const { getMetric } = require("./src/helper/metric");

// variables setup
const app = express();
const PORT = 5001;
const INTERVAL_PERIOD = 10 * 1000; // 10 second

// app setup
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started at ${getPrivateIp()}:${PORT}`);
});

// Print memory usage of server on interval
setInterval(() => {
  const metric = getMetric();
  const per = calculatePer(metric.usedMemory, metric.totalMemory);
  console.log(`Memory Usage: ${per} | CPU Usage: ${metric.cpuUsage.user} | Uptime: ${metric.uptime}` );
}, INTERVAL_PERIOD);
