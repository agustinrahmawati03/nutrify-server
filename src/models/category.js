const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    _id : {
        type : String
    },
    name: {
        type : String,
        maxlengh : 100,
        required : true
    }
})

const categoryModel = mongoose.model("Category", categorySchema)

module.exports = categoryModel