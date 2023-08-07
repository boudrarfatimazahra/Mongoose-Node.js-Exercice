const { Schema, model } = require("mongoose");

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    favoriteFoods: [
        {
            type: String
        }
    ]
})
module.exports = model("person", personSchema)