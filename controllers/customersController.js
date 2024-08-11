const Customer = require('../models/Customer');

// Create a new customer
exports.createCustomer = async (req, res) => {
  // #swagger.tags = ['customers']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'customers data.',
            required: true,
            schema: {
                name: "hung",
                email: "1234",
                phoneNumber: "123456789"
            }
        }
  */
  try {
    const newCustomer = new Customer(req.body);
    const customer = await newCustomer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => { 
  // #swagger.tags = ['customers']
  try {
    const { name, email, phoneNumber } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = email;
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    const customers = await Customer.find(filter);
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  // #swagger.tags = ['customers']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'customers data.',
            required: true,
            schema: {
                name: "hung",
                email: "1234",
                phoneNumber: "123456789"
            }
        }
  */
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  // #swagger.tags = ['customers']
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
