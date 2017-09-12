const User = require('./userModel')
const mongoose = require('mongoose')

const userController = {};

userController.createUser = (req, res, next) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
  }
  User.create(newUser, (err, user) => {
    if (err) console.log(err);
    if (user) {
      res.locals.id = user;
      next();
    }
  })
}

userController.verifyUser = (req, res, next) => {
  console.log(req.query)
  User.findOne({ username: req.query.username }, (err, user) => {
    if (err) console.log(err);

    user.comparePassword(req.query.password, function (err, isMatch) {
      if (err) throw err;
      //comparePassword method is defined in the model..compares password to non-hashed version;
      //if request password === hashed password isMatch(2nd parameter) will return a boolean true;
      if (isMatch) {
        res.locals.id = isMatch;
        next()
      }
    })

  })
}

module.exports = userController
