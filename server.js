
const mysql = require('mysql');

// Veritabanı bağlantısı için gerekli bilgiler
const dbConfig = {
  host: 'localhost',
  user: 'kullanici_adi',
  password: 'sifre',
  database: 'veritabani_adi'
};

// Veritabanına bağlan
const connection = mysql.createConnection(dbConfig);

// Bağlantıyı test et
connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanılamadı:', err);
    return;
  }
  console.log('Veritabanına başarıyla bağlanıldı!');
});
