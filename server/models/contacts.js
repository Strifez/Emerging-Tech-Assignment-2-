//contacts.js, Jason Huang, Portfolio Site, Assignment 2 Authentication - Contact List Model 
let mongoose = require('mongoose');

//create a model class
let contactSchema = mongoose.Schema({
    Name:String,
    Phone:String,
    Email:String
},
{
    collections: "contacts"
});

module.exports = mongoose.model('contacts', contactSchema);