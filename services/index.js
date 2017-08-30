const payment = require('./payment');

module.exports = (servicesConfig) => {
    return {
        'payment': payment(servicesConfig.payment)
    }
}
