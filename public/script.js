function adjust(id, delta) {
    const input = document.getElementById(id);
    input.value = (parseFloat(input.value) + delta).toFixed(id === 'efisiensi' ? 0 : 2);
}

function calculate() {
    const Q = parseFloat(document.getElementById('debit').value) || 0;
    const H = parseFloat(document.getElementById('head').value) || 0;
    const eta = (parseFloat(document.getElementById('efisiensi').value) || 0) / 100;
    const P = (1000 * 9.81 * Q * H * eta) / 1000;
    
    document.getElementById('result').innerText = P.toFixed(2) + " kW";
    
    const svg = document.getElementById('turbine-svg');
    const status = document.getElementById('turbine-status');

    // LOGIKA WARNA
    let color = P > 2000 ? "#ff7f00" : (P >= 500 ? "#00ff7f" : "#38bdf8");
    
    if (P > 0) {
        svg.style.stroke = color;
        svg.style.filter = `drop-shadow(0 0 10px ${color})`;
        svg.classList.add('spinning');
        status.innerText = "TURBINE STATUS: ACTIVE";
        status.style.color = color;
    } else {
        svg.style.stroke = "#38bdf8";
        svg.style.filter = "none";
        svg.classList.remove('spinning');
        status.innerText = "TURBINE STATUS: IDLE";
        status.style.color = "#38bdf8";
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