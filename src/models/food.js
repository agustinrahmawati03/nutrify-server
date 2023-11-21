const mongoose = require('mongoose')
const { Schema } = mongoose

const foodSchema = new Schema({
    name: {
        type : String,
        maxlengh : 255,
        required : true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type : String,
        ref : "Category"
    },
    cal: {
        type : Number,
        required : true
    },
    protein: {
        type : Number,
        required : true
    },
    carb: {
        type : Number,
        required : true
    },
    fat: {
        type : Number,
        required : true
    },
    carbon: {
        type : Number,
        required : true
    },
    desc: {
        type : String
    }
}, {
    timestamps: true,
    versionKey: false
})

const foodModel = mongoose.model("Food", foodSchema)

module.exports = foodModel