const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const contentSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    price: Number
})


const Admin = mongoose.model('Admin', adminSchema)
const Content = mongoose.model('Course', contentSchema)

module.exports = {
    Admin,
    Content
}