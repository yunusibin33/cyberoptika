// db.js

const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/userDB'; // MongoDB URL'si ve veritabanı adı

const connectDB = () => {
  mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB Connection Error: ', err));
};

module.exports = connectDB;
