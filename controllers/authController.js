const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');

exports.register = async (req, res) => {
    try {
      const { username, name, email, password, phoneNumber } = req.body;
  
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
  
      const newUser = new User({
        username,
        name,
        email,
        password,
        phoneNumber,
      });
      await newUser.save();
  
      let customer = await Customer.findOne({ email });
      if (!customer) {
        customer = new Customer({
          name,
          email,
          phoneNumber,
        });
        await customer.save();
      }
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { address, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { address, profileImage }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Customer.findOneAndDelete({ email: user.email });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
