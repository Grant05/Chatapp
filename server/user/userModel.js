const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: { type: String, required: true, min: 5, max: 12, unique: true},
  password: { type: String, required: true, min: 5, max: 12}
})

//when using this hook make sure NOT to use arrow functions as the key of this will change
userSchema.pre('save', function(next) {
  let user = this;
  //only hash the password if the password is modified/new password
  if (!user.isModified('password')) return next();
  //generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)
    //hash password using new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      //override password with hash
      user.password = hash;
      next();
    })
  })
})

userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', userSchema)
