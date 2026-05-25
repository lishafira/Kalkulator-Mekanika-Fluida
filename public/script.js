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
    
    // Animasi Turbin
    const turbine = document.getElementById('turbine-svg');
    const status = document.getElementById('turbine-status');
    turbine.classList.add('spinning');
    status.innerText = "TURBINE STATUS: ACTIVE";
    
    setTimeout(() => {
        turbine.classList.remove('spinning');
        status.innerText = "TURBINE STATUS: IDLE";
    }, 3000);
}