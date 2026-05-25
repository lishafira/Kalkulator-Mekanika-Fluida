const express = require('express');
const path = require('path');
const app = express();

// ==========================================================================
// MIDDLEWARE CONFIGURATION
// ==========================================================================

// Mengizinkan server membaca data berformat JSON dari request frontend
app.use(express.json());

// Mengizinkan server membaca data dari form konvensional jika diperlukan
app.use(express.urlencoded({ extended: true }));

// Melayani file statis (CSS, JS Frontend) dari folder 'public' secara absolut
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================================================
// ROUTING PLATFORM
// ==========================================================================

/**
 * Route Utama (GET /)
 * Mengirimkan file index.html ke browser pengguna saat tautan diakses
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Route Kalkulasi (POST /calculate)
 * Melakukan perhitungan estimasi daya turbin air berdasarkan parameter mekanika fluida
 */
app.post('/calculate', (req, res) => {
    const { debit, head, efisiensi } = req.body;

    // Spesifikasi Parameter Fisika Konstan
    const rho = 1000;  // Massa jenis air (kg/m³)
    const g = 9.81;    // Percepatan gravitasi bumi (m/s²)

    // Validasi Sisi Server (Server-Side Validation)
    if (debit === undefined || head === undefined || efisiensi === undefined) {
        return res.status(400).json({ error: "Parameter spesifikasi teknik tidak lengkap." });
    }

    // Konversi nilai input ke tipe data float
    const Q = parseFloat(debit);
    const H = parseFloat(head);
    const eta = parseFloat(efisiensi) / 100; // Mengubah persen ke desimal

    // Rumus Utama Hidroelektrik: P = η * ρ * g * Q * H (Hasil dalam Watt)
    const powerInWatts = eta * rho * g * Q * H;

    // Mengirimkan hasil kalkulasi kembali ke frontend dalam format JSON json
    res.json({ power: powerInWatts });
});

// ==========================================================================
// SERVER INITIALIZATION / VERCEL EXPORT
// ==========================================================================

// Menentukan port dinamis untuk production cloud (Vercel) atau port 3000 untuk lokal
const PORT = process.env.PORT || 3000;

// Jalankan listener server (Hanya aktif sepenuhnya saat pengujian lokal)
app.listen(PORT, () => {
    console.log(`[MEKFLU-SERVER] Running smoothly on http://localhost:${PORT}`);
});

module.exports = app;