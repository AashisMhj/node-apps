const axios = require('axios');
const SPACEX_URL = process.env.SPACEX_URL;

const networkService = {
    getLaunces: () => axios.get(`${SPACEX_URL}/launches`),
    getLaunch: (flight_number) => axios.get(`${SPACEX_URL}/launches/${flight_number}`),
    getRockets: () => axios.get(`${SPACEX_URL}/rockets`),
    getRocketDetail: (rocket_id)=> axios.get(`${SPACEX_URL}/rockets/${rocket_id}`),
    getShips: ()=> axios.get(`${SPACEX_URL}/ships`),
    getShipDetail: (ship_id) => axios.get(`${SPACEX_URL}/ships/${ship_id}`),
    healthCheck: () => axios.get(`${SPACEX_URL}`)
}

module.exports = networkService;