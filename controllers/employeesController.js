const Employee = require('../models/Employee');
const { Op } = require('sequelize');

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
    const { name, email, phoneNumber, branch, profileImage } = req.body;
    const newEmployee = await Employee.create({ name, email, phoneNumber, branch, profileImage });
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  // #swagger.tags = ['employees']
  try {
    const { branch, email, phoneNumber, name } = req.query;
    const filter = {};
    if (branch) filter.branch = branch;
    if (name) filter.name = { [Op.iLike]: `%${name}%` };
    if (email) filter.email = email;
    if (phoneNumber) filter.phoneNumber = phoneNumber;

    const employees = await Employee.findAll({ where: filter });
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
    const { name, email, phoneNumber, branch, profileImage } = req.body;
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.update({ name, email, phoneNumber, branch, profileImage });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  // #swagger.tags = ['employees']
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
