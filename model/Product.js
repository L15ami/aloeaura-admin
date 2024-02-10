const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    title: {type:  String, required: true},
    description: {type:  String, required: true},
    price: {type:  String, required: true},
    images: [{type: String}],
    details: {type:  String, required: true},


});

module.exports = models.Product || model('Product', ProductSchema);
