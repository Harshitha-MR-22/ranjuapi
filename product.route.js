const express = require('express');

//create object ref for express router
const proRoutes = express.Router();

//import model
let Product = require('./product.model');

//get request

proRoutes.route('/').get(function(req,res){
    Product.find(function(err,response){
        if(err) {
            console.log(err);

        }
        else{
            res.json(response);
        }
    });
});

//post request
proRoutes.route('/add').post(function(req,res) {

    //const to recieve post data from front end 
    let pro = new Product(req.body);

    pro.save().then(pro => {
        res.status(200).json({ product: 'Product added successfully in to database'});

    })
    .catch(err => {
        res.status(400).send('Unable to save value in to database');
    });
});


//get request with reference

proRoutes.route('/edit/:id').get(function(req,res) {
    let id = req.params.id;
    Product.findById({ _id : id}, function(err,response) {
        res.json(response);
    });
});

//Update request
proRoutes.route('/update/:id').put(function(req,res) {
    let id =req.params.id;
    Product.findById({ _id: id }, function(err, response) {
        if(!response) {
            res.status(400).send("No data Found....");
        } else {
            response.title = req.body.title;
            response.price = req.body.price;
            response.image = req.body.image;
            response.description = req.body.description;

            response.save().then(mydata => {
                res.status(200).send({ response: 'Successfully Updated the values' });
            })
            .catch(err => {
                res.status(400).send('Unable to update the response');
            });
        }
    });
});

//delete request

proRoutes.route('/delete/:id').delete(function(req,res){
    let id= req.params.id;

    Product.findByIdAndDelete({ _id:id }, function(err,response) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send({ response: 'Successfully deleted the product'});
        }
    });
});


module.exports = proRoutes;

