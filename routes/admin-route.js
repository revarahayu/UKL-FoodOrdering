const express = require(`express`)
const app = express()

app.use(express.json())

const adminController = require(`../controllers/admin-controller`)
const { authorize } =require('../controllers/auth-controller')

// login

// Authorization
app.post(`/admin`, authorize, adminController.addAdmin)
app.get(`/admin`, authorize, adminController.getAdmin)
app.post(`/admin/find`, authorize, adminController.findAdmin)
app.put(`/admin/:id`, authorize, adminController.updateAdmin)
app.delete(`/admin/:id`, authorize,adminController.deleteAdmin)

module.exports = app