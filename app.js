// app.js

const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Veritabanı bağlantısı
const connectDB = require('./db');
connectDB();

// API Endpointleri ve diğer işlemler burada olacak...

// Sunucu portu
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user'); // User modelini içeri aktarın

// Middleware ve veritabanı bağlantısı burada olacak...

// API Endpointleri
// Kullanıcıları listeleme (Read)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Yeni kullanıcı ekleme (Create)
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Kullanıcı güncelleme (Update)
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Kullanıcı silme (Delete)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Sunucu portu ve diğer ayarlar burada olacak...

module.exports = app;
