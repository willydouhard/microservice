'use strict';

const httpStatus = require('http-status-codes');

module.exports = (app, container) => {
    const {db} = container;
    const paymentService = container.services.payment
    app.post('/orders', (req, res, next) => {
        db.createOrder(req.body)
        .then(payload => paymentService.pay(payload))
        .then(_ => res.status(httpStatus.OK).send(req.body))
        .catch(next)
    })
}
