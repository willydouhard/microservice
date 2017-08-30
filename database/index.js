'use strict';

const repository = db => {
    const createOrder = data => {
        return new Promise( (resolve, reject)=> {
            setTimeout(resolve, 1000)
        })
    }

    const disconnect = _ => {
        return true;
    }

    return {createOrder, disconnect};
}

const connect = config => {
    return new Promise((resolve, reject) => {
        if(!config) return reject(new Error('no config for db connect'));
        const connection = true;
        return resolve(repository(connection))
    })
}

module.exports = {connect};
