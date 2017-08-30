'use strict';

const assert = require('assert');
const request = require('supertest');
const {start} = require('../../server');

// Stubs

const config = {
    server: {
        port: 3000
    }
};

const db = {
    createOrder: data => {
        return new Promise( (resolve, reject)=> {
            setTimeout(resolve, data)
        })
    }
}

const services = {
    payment: {
        pay: () => Promise.resolve()
    }
};

const container = {db, services};

let app;

beforeEach((done) => {
    start(config, container)
    .then(({server, config, container})=> {
        app = server;
        done();
    })
})

afterEach(() => {
    app.close()
    app = null
})

describe('Order micro service', () => {

    it('can create an order', (done) => {
        request(app)
        .post('/orders')
        .send({id: 1})
        .set('Accept', /application\/json/)
        .expect(200, {
            id: 1
        }, done)

    })

})
