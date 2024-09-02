const express = require(`express`)
const app = express()

app.use(express.json())

const orderController = require(`../controllers/order-controller`)
const { authorize } =require('../controllers/auth-controller')

app.get(`/order`, authorize, orderController.getOrder)
app.post(`/order/save`,orderController.addOrder)
app.put(`/order/:id_order_list`, authorize,orderController.updateOrder)
app.put(`/order/status/:id_order_list`, authorize,orderController.updateStatus)
app.delete(`/order/:id_order_list`, authorize,orderController.deleteOrder)


module.exports = app
