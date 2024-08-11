const About = require('../models/About');

// Create a new about
exports.createAbout = async (req, res) => {
  // #swagger.tags = ['about']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                title: "",
                content: "",
                image: "",
            }
        }
  */
  try {
    const newAbout = new About(req.body);
    const about = await newAbout.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all about info
exports.getAllAbout = async (req, res) => {
  // #swagger.tags = ['about']
  try {
    const abouts = await About.find();
    res.status(200).json(abouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update about info
exports.updateAbout = async (req, res) => {
  // #swagger.tags = ['about']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'category data.',
            required: true,
            schema: {
                title: "",
                content: "",
                image: "",
            }
        }
  */
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete about info
exports.deleteAbout = async (req, res) => {
  // #swagger.tags = ['about']
  try {
    await About.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'About info deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
