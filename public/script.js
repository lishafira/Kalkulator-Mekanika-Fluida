function adjust(id, delta) {
    const input = document.getElementById(id);
    input.value = (parseFloat(input.value || 0) + delta).toFixed(2);
}

function calculatePower() {
    const Q = parseFloat(document.getElementById('debit').value) || 0;
    const H = parseFloat(document.getElementById('head').value) || 0;
    const eta = (parseFloat(document.getElementById('efisiensi').value) || 0) / 100;
    
    const P = (1000 * 9.81 * Q * H * eta) / 1000; 
    document.getElementById('result').innerText = P.toFixed(2) + " kW";
    
    const turbine = document.querySelector('.turbine-rotor');
    
    if (P > 0) {
        if (!turbine.classList.contains('spinning')) {
            turbine.classList.add('spinning');
        }
        
        if (P < 500) { turbine.style.stroke = "#38bdf8"; } // Biru Cyan
        else if (P < 2000) { turbine.style.stroke = "#00ff7f"; } // Hijau Neon
        else { turbine.style.stroke = "#ff7f00"; } // Amber/Oranye
    } else {
        turbine.classList.remove('spinning'); 
        turbine.style.stroke = "#38bdf8"; 
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