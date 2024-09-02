const express = require(`express`)
const app = express()

const PORT = 5000
/** load library cors */
const cors = require(`cors`)
app.use(express.static(__dirname))
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const adminRoute = require(`./routes/admin-route`)
const foodRoute = require(`./routes/food-route`)
const orderRoute = require(`./routes/order-route`)

const auth = require(`./routes/auth-route`)


app.use(`/admin/auth`, auth)

app.use(adminRoute)
app.use(foodRoute)
app.use(orderRoute)


app.listen(PORT, () => {
    console.log(`Server is running...`)
})