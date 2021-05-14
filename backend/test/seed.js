const {User} = require('../app/models/user.model');
var ObjectID = require('mongodb').ObjectID; 
const userOneID = new ObjectID();
// const userTwoID = new ObjectID();

const jwt = require("jsonwebtoken");
const key = require('../app/config/auth.config')


//   _id: userOneID,
const users = [{
  username: "user4",
  password: "admin123",
  email: "user@gmail.com",
  phone: "1234567890",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, key.secret).toString()
  }]
}, 
// {
//   _id: userTwoID,
//   email: "person2@gmail.com",
//   password: "person2PASSWORD",
//   tokens: [{
//     access: 'auth',
//     token: jwt.sign({_id: userTwoID, access: 'auth'}, process.env.JWT_SECRET).toString()
//   }]
// }
]

  
  var addDummyUsers = (done) => {
    User.deleteMany({}).then(() => {
      var userOne = new User(users[0]).save();
    //   var userTwo = new User(users[1]).save();
  
      return Promise.all([userOne, userTwo])
    }).then(() => done());
  };

  module.exports = {
    users,
    addDummyUsers
  }