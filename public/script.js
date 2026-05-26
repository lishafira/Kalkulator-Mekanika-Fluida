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
    
    turbineSvg.classList.remove('spinning');
    
    if (P > 0) {
        let color = P >= 2000 ? "#ff7f00" : (P >= 500 ? "#00ff7f" : "#38bdf8");
        turbineSvg.querySelectorAll('circle, path, line').forEach(el => {
            el.style.stroke = color;
            el.style.filter = `drop-shadow(0 0 8px ${color})`;
        });

        void turbineSvg.offsetWidth; 
        
        turbineSvg.classList.add('spinning');
        statusText.innerText = "TURBINE STATUS: ACTIVE";
        statusText.style.color = color;
    } else {
        // Kondisi jika 0, hentikan semuanya
        turbineSvg.classList.remove('spinning');
        statusText.innerText = "TURBINE STATUS: IDLE";
        statusText.style.color = "#38bdf8";
        
        // Reset warna ke default saat berhenti
        turbineSvg.querySelectorAll('circle, path, line').forEach(el => {
            el.style.stroke = "#38bdf8";
            el.style.filter = "none";
        });
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