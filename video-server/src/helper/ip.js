'use strict'
const {networkInterfaces} = require('os');
const nets = networkInterfaces();

function getPrivateIp(){
    const result = Object.create(null);
    for (const name of Object.keys(nets)){
        for (const net of nets[name]){
            // Skip over non-IPv4 and internal (i.e 127.0.0.1) address
            // IPv4 is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
            if(net.family === familyV4Value && !net.internal){
                if(!result[name]){
                    result[name] = [];
                }
                result[name].push(net.address);
            }
        }
    }
    return result.wlo1 && result.wlo1.length > 0 ? result.wlo1[0] : 'Undefined';
}
module.exports = getPrivateIp;