const express = require(`express`)
const app = express()

const foodController = require(`../controllers/food-controller`)
const { authorize } =require('../controllers/auth-controller')

app.get('/food', foodController.getFood);
app.get('/food/:id_food', foodController.getFoodById);

app.post('/food', authorize, foodController.addFood);
app.post('/food/find', authorize, foodController.filterFood);
app.put('/food/:id_food', authorize, foodController.updateFood);
app.delete('/food/:id_food', authorize, foodController.deleteFood);

module.exports = app