let express = require('express')
let router = express.Router()
let bcrypt = require('bcrypt')
let mongoose = require('mongoose')
let User = mongoose.model('User')
let List = mongoose.model('List')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session['userId']) {
    List.find()
        .then((docs) => {
          if (docs.length === 0) {
            res.send("No list exists")
          }
          else {
            res.render('index', {
              title: "Roommate Shopping",
              user: req.session['username'],
              // items: [{name: 'Milk'}, {name: 'Bread'}],
              list: docs[0]
            })
          }
        })
        .catch((err) => {
          res.send(err)
        })
  }
  else {
    res.render('login')
  }
})

router.get('/signup', (req, res, next) => {
  res.render('signup')
})

router.post('/login', (req, res, next) => {
  let b = req.body
  if (b.username && b.pass) {
    User.find({username: b.username})
        .then((docs, err) => {
          if (err) {
            res.send({err: true, msg: err})
          }
          else if (docs.length > 0) {
            let u = docs[0]
            bcrypt.compare(b.pass, u.pass, (err, response) => {
              if (response) {
                req.session['userId'] = u.pass
                req.session['username'] = u.username
                req.session['name'] = u.name
                res.send({err: false})
              }
              else {
                res.send({err: true, msg: "Invalid login."})
              }
            })
          }
          else {
            res.send({err: true, msg: "User not found."})
          }
        })
  }
  else {
    res.send({err: true, msg: "Missing parameters."})
  }
})

router.post('/signup', (req, res, next) => {
  let b = req.body
  if (b.username && b.pass) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.send({err: true, msg: err})
      }
      else {
        bcrypt.hash(b.pass, salt, (err, hash) => {
          if (err) {
            res.send({err: true, msg: err})
          }
          else {
            let u = User()
            u.username = b.username
            u.pass = hash
            u.name = b.name ? b.name : ''
            u.save()
            res.send({err: false, u})
          }
        })
      }
    })
  }
  else {
    res.send({err: true, msg: "Missing parameters."})
  }
})

module.exports = router
