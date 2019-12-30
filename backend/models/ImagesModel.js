const mongoose = require('mongoose')
const Schema = mongoose.Schema

const decoModel = new Schema({
    refId: {type: String},
    image: {type: String, required:true}
})

module.exports = mongoose.model('images', decoModel)