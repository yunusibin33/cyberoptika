const express = require('express');
const app = express();

// Serve static files from the "public" folder
app.use(express.static('public'));

// Serve static files from the "css" folder
app.use('/css', express.static('css'));

// Serve static files from the "js" folder
app.use('/js', express.static('js'));

// Serve signin.html as the default page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signin.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/signin.html', (req, res) => {
  res.sendFile(__dirname + '/signin.html');
});

app.get('/kategori', (req, res) => {
  res.json({ 'product': 'Elma', 'price': 3.50, 'currency': 'TL' });
});

app.get('/galeri/:categoryUrl/:titleUrl', (req, res) => {
  const category = req.params.categoryUrl;
  const titleUrl = req.params.titleUrl;
  res.send(`${category} kategorisindeki ${titleUrl} içeriğine bakıyorsunuz.`);
});

app.listen(3000, () => {
  console.log('Uygulama çalıştırıldı...');
});
