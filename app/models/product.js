var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
	title:String,
	description:String,
	price:Number,
	quantity: Number
})

mongoose.model("Product",productSchema);

module.exports = mongoose.model("Product",productSchema);
