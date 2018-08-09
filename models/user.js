let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  pass: String,
  name: String
})

mongoose.model('User', userSchema)