const mongoose = require("mongoose");

const usersschema = new mongoose.Schema({
    name: String,
    email:String,
    age:Number

})

const usermodel = mongoose.model("users",usersschema);
//  mongoose.model("collectionNameinMangoDB",schemaName);

module.exports = usermodel;
