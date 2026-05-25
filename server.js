const express = require('express');
const path = require('path'); // Tambahkan ini
const app = express();

app.use(express.json());

// Mengarahkan folder 'public' sebagai tempat file statis (CSS, JS)
app.use(express.static('public'));

// Tambahkan kode ini agar saat akses localhost:3000, file index.html tampil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route untuk perhitungan (pastikan ini sudah ada)
app.post('/calculate', (req, res) => {
    const { debit, head, efisiensi } = req.body;
    const g = 9.81;
    const rho = 1000;
    const power = (efisiensi / 100) * rho * g * debit * head;
    res.json({ power: power.toFixed(2) });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));