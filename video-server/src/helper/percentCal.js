function calculatePer(value, total){
    const valueParsed = parseInt(value);
    const totalParsed = parseInt(total);
    return ((valueParsed/ totalParsed) * 100).toFixed(2);
}
module.exports = calculatePer;