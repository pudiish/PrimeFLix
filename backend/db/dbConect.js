const mongoose = require('mongoose');

exports.dbConnection = async () => {
    mongoose.set('strictQuery', true)
    await mongoose.connect("mongodb://localhost:27017/Player")
        .then(() => {
            console.log('Db Connected')
        }).catch((err) => {
            console.log(err)
        })
}