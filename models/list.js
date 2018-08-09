let mongoose = require('mongoose')

let listSchema = new mongoose.Schema({
  name: String,
  items: []
})

mongoose.model('List', listSchema)
