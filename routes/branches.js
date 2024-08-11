const express = require('express');
const router = express.Router();
const {
  createBranch,
  getAllBranches,
  updateBranch,
  deleteBranch
} = require('../controllers/branchesController');

router.post('/api/branches', createBranch); 
router.get('/api/branches', getAllBranches);
router.put('/api/branches/:id', updateBranch); 
router.delete('/api/branches/:id', deleteBranch); 

module.exports = router;
