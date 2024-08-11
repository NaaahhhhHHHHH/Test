const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');

exports.register = async (req, res) => {
  // #swagger.tags = ['auth']
  // #swagger.summary = 'register new account'
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                username: "",
                name: "",
                email: "",
                password: "",
                phoneNumber: "",
                address: "",
                profileImage: "",
                role: "",
            }
        }
  */
    try {
      const { username, name, email, password, phoneNumber, role } = req.body;
  
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
        role
      });
      await newUser.save();
      if (role != 'admin') {
        let customer = await Customer.findOne({ email });
        if (!customer) {
          customer = new Customer({
            name,
            email,
            phoneNumber,
          });
        await customer.save();
        }
      }
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


exports.loginCustomer = async (req, res) => {
  // #swagger.tags = ['auth']
  // #swagger.summary = 'login for customer'
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                emailOrUsername: "",
                password: "",
            }
        }
  */
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user || user.role != 'customer') {
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

exports.loginAdmin = async (req, res) => {
  // #swagger.tags = ['auth']
  // #swagger.summary = 'login for admin'
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                emailOrUsername: "",
                password: "",
            }
        }
  */
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user || user.role != 'admin') {
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
  // #swagger.tags = ['auth']
  // #swagger.summary = 'update user info'
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                username: "",
                name: "",
                email: "",
                password: "",
                phoneNumber: "",
                address: "",
                profileImage: "",
                role: "",
            }
        }
  */
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
  // #swagger.tags = ['auth']
  // #swagger.summary = 'get user list'
  try {
    const { username, email, phoneNumber, name, role} = req.query;
    const filter = {};
    if (username) filter.username = username;
    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = email;
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    if (role) filter.role = role;
    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  // #swagger.tags = ['auth']
  // #swagger.summary = 'delete user'
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
