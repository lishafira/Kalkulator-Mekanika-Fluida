const express = require('express');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/calculate', (req, res) => {
    const { debit, head, efisiensi } = req.body;

    const rho = 1000;  // Massa jenis air (kg/m³)
    const g = 9.81;    // Percepatan gravitasi bumi (m/s²)

    if (debit === undefined || head === undefined || efisiensi === undefined) {
        return res.status(400).json({ error: "Parameter spesifikasi teknik tidak lengkap." });
    }

    const Q = parseFloat(debit);
    const H = parseFloat(head);
    const eta = parseFloat(efisiensi) / 100; 
    const powerInWatts = eta * rho * g * Q * H;

    res.json({ power: powerInWatts });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[MEKFLU-SERVER] Running smoothly on http://localhost:${PORT}`);
});

module.exports = app;