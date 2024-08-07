const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kreditmotorbca'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
});

// Endpoint untuk menambah pengajuan kredit
app.post('/apply', (req, res) => {
    const { nama_pemohon, nomor_identitas, alamat, jumlah_pinjam, tenor } = req.body;
    const sql = 'INSERT INTO KreditMotor (nama_pemohon, nomor_identitas, alamat, jumlah_pinjam, tenor) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nama_pemohon, nomor_identitas, alamat, jumlah_pinjam, tenor], (err, result) => {
        if (err) throw err;
        res.send('Pengajuan kredit berhasil!');
    });
});

// Endpoint untuk melihat semua pengajuan
app.get('/applications', (req, res) => {
    const sql = 'SELECT * FROM KreditMotor';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint untuk approve atau menolak pengajuan
app.post('/approve', (req, res) => {
    const { id, status } = req.body;
    const sql = 'UPDATE KreditMotor SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) throw err;
        res.send('Status pengajuan diperbarui!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
