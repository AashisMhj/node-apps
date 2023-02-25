function calculatePer(value, total){
    const value_parserd = parseInt(value);
    const total_parsed = parseInt(total);
    return (value_parserd/ total_parsed) * 100;
}
module.exports = calculatePer;