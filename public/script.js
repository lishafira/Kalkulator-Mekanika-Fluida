function adjust(id, delta) {
    const input = document.getElementById(id);
    const step = parseFloat(input.step) || 1;
    let val = parseFloat(input.value) || 0;
    
    val = (val + delta).toFixed(step < 1 ? 2 : 0);
    input.value = val;
    
    input.style.color = "#38bdf8";
    setTimeout(() => { input.style.color = "#ffffff"; }, 150);
}

function calculate() {
    const Q = parseFloat(document.getElementById('debit').value) || 0;
    const H = parseFloat(document.getElementById('head').value) || 0;
    const eta = (parseFloat(document.getElementById('efisiensi').value) || 0) / 100;
    
    //P = (rho * g * Q * H * eta) / 1000
    const P = (1000 * 9.81 * Q * H * eta) / 1000;
    document.getElementById('result').innerText = P.toFixed(2) + " kW";
    
    let color = "#38bdf8"; // Default Cyan
    if (P >= 500 && P <= 2000) {
        color = "#00ff7f"; // Hijau Neon
    } else if (P > 2000) {
        color = "#ff7f00"; // Oranye/Amber
    }

    const turbineSvg = document.getElementById('turbine-svg');
    const elements = turbineSvg.querySelectorAll('circle, path, line');
    
    elements.forEach(el => {
        el.style.stroke = color;
        el.style.filter = `drop-shadow(0 0 8px ${color})`;
    });

    turbineSvg.classList.remove('spinning');
    void turbineSvg.offsetWidth; 
    turbineSvg.classList.add('spinning');

    const statusText = document.getElementById('turbine-status');
    statusText.innerText = P > 0 ? "TURBINE STATUS: ACTIVE" : "TURBINE STATUS: IDLE";
    statusText.style.color = color;
}

l
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value === "" || isNaN(this.value)) {
            this.value = this.id === 'debit' ? "0.00" : "0";
        }
    });
});