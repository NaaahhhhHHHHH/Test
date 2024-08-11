const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Customer = require('../models/Customer');

exports.createAppointment = async (req, res) => {
  // #swagger.tags = ['appointment']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                userId: "",
                name: "",
                email: "",
                phoneNumber: "",
                service: "",
                employee: "",
                branch: "",
                timeslot: "",
            }
        }
  */
  try {
    const { userId, name, email, phoneNumber, service, employee, branch, timeslot } = req.body;
    let customer;
    let user;

    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      customer = await Customer.findOne({ email: user.email });
      if (!customer) {
        customer = new Customer({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
        await customer.save();
      }
    } else {
      customer = await Customer.findOne({ email });
      if (!customer) {
        customer = new Customer({ name, email, phoneNumber });
        await customer.save();
      }
    }

    const newAppointment = new Appointment({
      user: userId ? userId : undefined,
      name: userId ? user.name : name, 
      email: userId ? user.email : email,
      phoneNumber: userId ? user.phoneNumber : phoneNumber, 
      service: service,
      employee: employee,
      branch: branch,
      timeslot,
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully', newAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  // #swagger.tags = ['appointment']
  try {
    const { userId, service, employee, phoneNumber, name, branch, timeslot } = req.query;
    const filter = {};
    if (userId) filter.userId = userId;
    if (name) filter.name = new RegExp(name, 'i');
    if (service) filter.service = service;
    if (employee) filter.employee = employee;
    if (branch) filter.branch = branch;
    if (timeslot) filter.timeslot = timeslot;
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    const appointments = await Appointment.find(filter).populate('service employee branch');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  // #swagger.tags = ['appointment']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                userId: "",
                name: "",
                email: "",
                phoneNumber: "",
                service: "",
                employee: "",
                branch: "",
                timeslot: "",
            }
        }
  */
  try {
    const { customerId, name, email, phoneNumber, service, employee, branch, timeslot } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { customer: customerId, name, email, phoneNumber, service: service, employee: employee, branch: branch, timeslot }, { new: true });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  // #swagger.tags = ['appointment']
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
