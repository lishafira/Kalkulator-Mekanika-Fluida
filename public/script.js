function adjust(id, delta) {
    const input = document.getElementById(id);
    input.value = (parseFloat(input.value || 0) + delta).toFixed(2);
}

function calculate() {
    const Q = parseFloat(document.getElementById('debit').value) || 0;
    const H = parseFloat(document.getElementById('head').value) || 0;
    const eta = (parseFloat(document.getElementById('efisiensi').value) || 0) / 100;
    const P = (1000 * 9.81 * Q * H * eta) / 1000;
    
    document.getElementById('result').innerText = P.toFixed(2) + " kW";
    
    const turbineSvg = document.getElementById('turbine-svg');
    const statusText = document.getElementById('turbine-status');
    const elements = turbineSvg.querySelectorAll('circle, path');

    // Indikator Warna Dinamis
    let color = "#38bdf8"; // Default Cyan
    if (P >= 500 && P <= 2000) color = "#00ff7f"; // Hijau Neon
    if (P > 2000) color = "#ff7f00"; // Oranye

    // Logika Status Turbin
    if (P > 0) {
        elements.forEach(el => { el.style.stroke = color; el.style.filter = `drop-shadow(0 0 8px ${color})`; });
        turbineSvg.classList.add('spinning');
        statusText.innerText = "TURBINE STATUS: ACTIVE";
        statusText.style.color = color;
    } else {
        elements.forEach(el => { el.style.stroke = "#38bdf8"; el.style.filter = "none"; });
        turbineSvg.classList.remove('spinning');
        statusText.innerText = "TURBINE STATUS: IDLE";
        statusText.style.color = "#38bdf8";
    }
}
l
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value === "" || isNaN(this.value)) {
            this.value = this.id === 'debit' ? "0.00" : "0";
        }
    });
});