// Set up =================================
var express = require("express");
var app = express(); //Create app with express
var mongoose = require("mongoose"); // Mongoose for MongoDb
var Schema = mongoose.Schema;
var morgan = require("morgan"); // log requests to console
var bodyParser = require("body-parser"); //pull info from html post
var methodOverride = require("method-override");

//config

mongoose.connect('mongodb://localhost:27017/pos');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var productSchema = new Schema({
	title:String,
	description:String,
	price:Number,
	quantity: Number
})

var Product = mongoose.model("Product",productSchema);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


//routes ================

//api----------------
//get all todos

app.get("/api/products",function(req,res){
	//use mongoose to get all todos in the database
	Product.find(function(err,products){
		//if error return error
		if(err){
			res.send(err);
		}
		//return todos in json
		res.json(products);
	});
});

app.get("/api/products/:product_id",function(req,res){
	//use mongoose to get all todos in the database
	Product.find({
		_id : req.params.product_id
	},function(err,product){
		//if error return error
		if(err){
			res.send(err);
		}
		//return todos in json
		res.json(product);
	});
});

app.post("/api/products",function(req,res){
	Product.create({
		title : req.body.title,
		description : req.body.description,
		price : req.body.price,
		quantity : req.body.quantity
	},function(err,product){
		if(err)
			res.send(err);

		//Get and return all the todos after you create another
		Product.find(function(err,products){
			if (err)
				res.send(err);

			res.json(products);
		});
	});
});

app.delete("/api/products/:product_id",function(req,res){

	Product.findOneAndRemove({
		_id : req.params.product_id
	},function(err,product){
		if (err) {
			res.send(err);
		};

		Product.find(function(err, products) {
                if (err)
                    res.send(err)
                res.json(products);
            });
	})
})

//application -------------------------

app.get("*", function(req,res){
	res.sendfile("./public/index.html");
})