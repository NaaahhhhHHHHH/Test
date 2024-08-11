const Employee = require('../models/Employee');

// Create a new employee
exports.createEmployee = async (req, res) => {
  // #swagger.tags = ['employees']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'gallery data.',
            required: true,
            schema: {
                name: "",
                email: "",
                phoneNumber: "",
                branch: "",
                profileImage: "",
            }
        }
  */
  try {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  // #swagger.tags = ['employees']
  try {
    const { branch, email, phoneNumber, name} = req.query;
    const filter = {};
    if (branch) filter.branch = branch;
    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = email;
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  // #swagger.tags = ['employees']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'gallery data.',
            required: true,
            schema: {
                name: "",
                email: "",
                phoneNumber: "",
                branch: "",
                profileImage: "",
            }
        }
  */
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  // #swagger.tags = ['employees']
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
