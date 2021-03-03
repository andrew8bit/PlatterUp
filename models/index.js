const mongoose = require('mongoose')

configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
 };

mongoose.connect('mongodb://localhost/platterUp', configOptions)

const db = mongoose.connection;

db.once('open', ()=> {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (err)=> {
    console.error('error with database', err)
})

module.exports = {
    User: require('./user'),
}