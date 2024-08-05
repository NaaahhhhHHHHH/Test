const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/customers', require('./routes/customers'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/services', require('./routes/services'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/about', require('./routes/about'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/branches', require('./routes/branches'));
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));