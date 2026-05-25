function adjust(id, delta) {
    const input = document.getElementById(id);
    const step = parseFloat(input.step) || 1;
    let val = parseFloat(input.value) || 0;
    
    val = (val + delta).toFixed(step < 1 ? 2 : 0);
    input.value = val;
    input.style.color = "#38bdf8";
    setTimeout(() => { 
        input.style.color = "#fff"; 
    }, 150);
}

function calculate() {
    // 1. Lakukan perhitungan
    const Q = parseFloat(document.getElementById('debit').value) || 0;
    const H = parseFloat(document.getElementById('head').value) || 0;
    const eta = (parseFloat(document.getElementById('efisiensi').value) || 0) / 100;
    const P = (1000 * 9.81 * Q * H * eta) / 1000;
    document.getElementById('result').innerText = P.toFixed(2) + " kW";

    const turbine = document.querySelector('.turbine');
    turbine.classList.add('active');

    setTimeout(() => {
        turbine.classList.remove('active');
    }, 3000);
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        if(this.value === "") this.value = "0.00";
    });
});