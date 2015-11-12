var Product = require("./models/product");

module.exports = function(app){
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

  app.get("*.html", function(req,res){
    res.sendfile("./public/index.html");
  })
};
