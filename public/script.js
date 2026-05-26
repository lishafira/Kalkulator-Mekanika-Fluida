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
    
    const turbine = document.getElementById('turbine-svg');
    const statusText = document.getElementById('turbine-status');
    
    turbine.classList.remove('spinning'); 
    
    if (P > 0) {
        let color = P >= 2000 ? "#ff7f00" : (P >= 500 ? "#00ff7f" : "#38bdf8");
        turbine.style.stroke = color;
        turbine.style.filter = `drop-shadow(0 0 10px ${color})`;
        void turbine.offsetWidth; 
        turbine.classList.add('spinning');
        statusText.innerText = "TURBINE STATUS: ACTIVE";
        statusText.style.color = color;
    } else {
        // Matikan jika P = 0
        turbine.style.stroke = "#38bdf8";
        turbine.style.filter = "none";
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