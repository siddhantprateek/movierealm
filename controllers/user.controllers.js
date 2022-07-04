const UserModel = require('../models/users.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


// Register new user
// @route POST /api/register
// @access public
const registerUser = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    
    if (!username || !email || !password) {
        res.status(400).send('Invalid')
        throw new Error('Please add all fields')
      }

    
    // check existance of user in Database
    const userExist = await UserModel.findOne({ email })

    if(userExist){
      res.status(400).send("user already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const userdata = await UserModel.create({
      username: username,
      password: hashedPassword,
      email: email
    })

    if(userdata){
      res.status(201).json({
        _id: userdata._id,
        username: userdata.username,
        email: userdata.email,
        token: generateToken(userdata._id)
      })
    }else {
      res.status(400).send('Invalid user credentials')
    }
}

// login user
// @route POST /api/login
// @access public
const loginUser = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = await UserModel.findOne({ username })

  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  }else{
    res.status(400).send('Invalid user credentials')
  }
}

const getMe = async (req, res) => {
  res.status(200).json(req.user)
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}