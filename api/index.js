'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');

module.exports = (app, container) => {
    const router = express.Router();
    const {db} = container;
    const paymentService = container.services.payment
    router.post('/', (req, res, next) => {
        db.createOrder(req.body)
        .then(payload => paymentService.pay(payload))
        .then(_ => res.status(httpStatus.OK).send(req.body))
        .catch(next)
    })

    app.use('/orders', router);
}
