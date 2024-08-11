const express = require('express');
const router = express.Router();
const { register, loginCustomer, loginAdmin, updateUser, getAllUsers, deleteUser } = require('../controllers/authController');

router.post('/api/auth/register', register); 
router.post('/api/auth/loginCustomer', loginCustomer);
router.post('/api/auth/loginAdmin', loginAdmin);
router.put('/api/auth/updateUser/:id', updateUser);
router.delete('/api/auth/deleteUser/:id', deleteUser);
router.get('/api/auth', getAllUsers);

module.exports = router;
