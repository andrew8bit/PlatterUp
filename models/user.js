const mongoose = require('mongoose')

// has a name String and price Number

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    time: String,
    animalFriendly: Boolean,
    directions: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    //embedded 
    recipes: [[recipeSchema]]
});

// give a name and a schema mongoose.model() method
const User =  mongoose.model('User', userSchema)

module.exports = User