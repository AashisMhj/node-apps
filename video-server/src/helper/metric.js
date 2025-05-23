const os = require("os");

function getMetric() {
  const memoryUsage = process.memoryUsage();

  return {
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    loadAverage: os.loadavg(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    usedMemory: memoryUsage.rss,
    cpuUsage: process.cpuUsage(),
    cpuInfo: os.cpus(),
    architecture: os.arch(),
    networkInterfaces: os.networkInterfaces(),
  };
}

module.exports = {
  getMetric,
};
