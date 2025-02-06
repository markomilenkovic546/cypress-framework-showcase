import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
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
      occupation,
    } = req.body;

    // Check if any required fields are missing
    const missingFields = [];
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!picturePath) missingFields.push('picturePath');
    if (!location) missingFields.push('location');
    if (!occupation) missingFields.push('occupation');

    // If there are missing fields, return a 400 response with the missing fields
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields: missingFields,
      });
    }

    // Proceed with password hashing and user creation if all fields are present
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    if (err.message.includes('duplicate key error')) {
      res.status(400).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email) {
      return res.status(400).json({ msg: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is required." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

