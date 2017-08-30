'use strict';

const {start} = require('./server');
const di = require('./di');

// log unhandled exceptions
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
})

di()
.then(({config, container}) => start(config, container))
.then(({server, config, container})=> {
    console.log(`Server started succesfully, running on port: ${config.server.port}.`)
    server.on('close', () => container.db.disconnect())
})
.catch((err) => {
    console.error(err)
})
