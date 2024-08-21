const express = require('express');
const { sequelize, connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/beautyBooking/', require('./routes/customers'));
app.use('/beautyBooking/', require('./routes/categories'));
app.use('/beautyBooking/', require('./routes/services'));
app.use('/beautyBooking/', require('./routes/appointments'));
app.use('/beautyBooking/', require('./routes/blogs'));
app.use('/beautyBooking/', require('./routes/about'));
app.use('/beautyBooking/', require('./routes/gallery'));
app.use('/beautyBooking/', require('./routes/employees'));
app.use('/beautyBooking/', require('./routes/branches'));
app.use('/beautyBooking/', authRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.use('/api-beauty-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));