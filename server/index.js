'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpStatus = require('http-status-codes');
const orderApi = require('../api');

const start = (config, container) => {
    return new Promise( (resolve, reject) => {
        if(!config.server.port) return reject(new Error(`No port supplied`))

        const app = express();
        app.use(morgan('dev'));
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        orderApi(app, container);

        // 500
        app.use((err, req, res, next) => {
            if(err) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    error: err.message
                })
            } else return next();
        });

        // 404
        app.use((req, res, next) => {
            res
            .status(httpStatus.NOT_FOUND)
            .send({
                error: httpStatus.getStatusText(httpStatus.NOT_FOUND)
            });
        })

        const server = app.listen(config.server.port, _ => resolve({server, config, container}));
    })
}

module.exports = {start};
