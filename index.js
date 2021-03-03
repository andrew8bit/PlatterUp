require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const consoleSep = '****************************************';
const methodOverride = require('method-override');

const db = require('./models');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.get('/', (req, res) => {
    res.render('homepage')
})

app.post('/', (req, res) => {
    const {name, recipeName, time, animalFriendly, ingredients, directions, } = req.body

    const addNewRecipe = async ()=> {
        let foundUser = await db.User.findOne({ name: name })
        foundUser === null ? foundUser = await db.User.create({ name: name}):
        console.log(foundUser)

        foundUser.recipes.push({
            name: recipeName,
            ingredients: ingredients,
            time: time,
            animalFriendly: animalFriendly,
            directions: directions
        })

        await foundUser.save()
        res.redirect('/')
      }

    addNewRecipe()
})

app.get('/cooks', async (req, res) => {
    console.log('hello')
    const allCooks = await db.User.find()

    res.json(allCooks)
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});