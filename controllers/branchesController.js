const Branch = require('../models/Branch');

exports.createBranch = async (req, res) => {
  try {
    const { name, address, phoneNumber, email, openingHours, image } = req.body;

    const newBranch = new Branch({ name, address, phoneNumber, email, openingHours, image });
    await newBranch.save();

    res.status(201).json({ message: 'Branch created successfully', newBranch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const { name, address, phoneNumber, email, openingHours, image } = req.body;
    const branch = await Branch.findByIdAndUpdate(req.params.id, { name, address, phoneNumber, email, openingHours, image }, { new: true });

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
