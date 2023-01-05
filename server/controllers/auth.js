import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"

//Registering the User
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body;

    //Encryption
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User ({
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000)
    });

    //Front-end can receive response
    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
  } catch(error) {
    
  }
}

//Log In
export const login = async (req, res) => {
  try {
    //Try correct email and password
    const {email, password} = req.body;
    const user = await User.findOne({ email: email })
    if(!user) return res.status(400).json({ message: "User does not exist" });

    const matching = await bcrypt.compare(password, user.password)
    if (!matching) return res.status(400).json({ message: "Incorrect login" })

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user })
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}