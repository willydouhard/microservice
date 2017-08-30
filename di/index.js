'use strict';

const {connect} = require('../database');
const config = require('../config');
const services = require('../services')(config.services);

module.exports = () => {
    return new Promise((resolve, reject) => {
        const container = {services};
        connect(config.database)
        .then((db)=> {
            container['db'] = db;
            return resolve({config, container})
        })
    })
}
