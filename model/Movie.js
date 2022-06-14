const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    mac: {
        type: String
    },
    adc: {
        type: Number
    },
    ket: {
        type: String
    }
})

module.exports = mongoose.model('cahaya', MovieSchema)