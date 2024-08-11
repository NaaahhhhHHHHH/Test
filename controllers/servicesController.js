const Service = require('../models/Service');

// Create a new service
exports.createService = async (req, res) => {
  // #swagger.tags = ['services']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'service data.',
            required: true,
            schema: {
                title: "",
                subtitle: "",
                category: "",
                text: "",
                url: ""
            }
        }
  */
  try {
    const newService = new Service(req.body);
    const service = await newService.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  // #swagger.tags = ['services']
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const services = await Service.find().populate('category');
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  // #swagger.tags = ['services']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'service data.',
            required: true,
            schema: {
                title: "",
                subtitle: "",
                category: "",
                text: "",
                url: ""
            }
        }
  */
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  // #swagger.tags = ['services']
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
