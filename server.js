const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());

mongoose.connect('Connect with mongose database ', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
