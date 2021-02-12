const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// create users Schema & model
const UsersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    branch:{
      type: String
    },
    batch:{
        type: String
    },
    college: {
        type: String
    },
    imageURL:
    {
        type:String
    },
    size:
    {
      type: Number
    },
    verified:
    {
      type:Number
    }
});

// encrypting the password
UsersSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  // static method to login user
UsersSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;