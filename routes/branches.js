const express = require('express');
const router = express.Router();
const {
  createBranch,
  getAllBranches,
  updateBranch,
  deleteBranch
} = require('../controllers/branchesController');

router.post('/', createBranch); 
router.get('/', getAllBranches);
router.put('/:id', updateBranch); 
router.delete('/:id', deleteBranch); 

module.exports = router;
