function adjust(id, delta) {
    const input = document.getElementById(id);
    let val = parseFloat(input.value) || 0;
    val = (val + delta).toFixed(id === 'efisiensi' ? 0 : 2);
    if (val < 0) val = id === 'efisiensi' ? "0" : "0.00";
    
    input.value = val;
}

function calculate() {
    const Q = parseFloat(document.getElementById('debit').value) || 0;
    const H = parseFloat(document.getElementById('head').value) || 0;
    const eta = (parseFloat(document.getElementById('efisiensi').value) || 0) / 100;
    
    //P = (rho * g * Q * H * eta) / 1000
    const P = (1000 * 9.81 * Q * H * eta) / 1000;
    document.getElementById('result').innerText = P.toFixed(2) + " kW";
    document.getElementById('stat-q').innerText = Q.toFixed(2);
    document.getElementById('stat-h').innerText = H.toFixed(2);
    document.getElementById('stat-eff').innerText = (eta * 100).toFixed(0);
    document.getElementById('stat-p').innerText = P.toFixed(2);
    
    const turbineSvg = document.getElementById('turbine-svg');
    const statusText = document.getElementById('turbine-status');
    const pumpIcon = document.getElementById('main-pump');
    const flow1 = document.getElementById('flow1');
    const flow2 = document.getElementById('flow2');
    
    turbineSvg.classList.remove('spinning');
    pumpIcon.classList.remove('pump-spinning');
    flow1.classList.remove('flowing');
    flow2.classList.remove('flowing');

    if (P > 0) {
        //Cyan (<500), Hijau Neon (500-2000), Amber (>2000)
        let color = "#38bdf8"; 
        if (P >= 500 && P <= 2000) {
            color = "#00ff7f"; 
        } else if (P > 2000) {
            color = "#ff7f00"; 
        }
        
        // Aplikasikan warna & glow effect ke bagian dalam garis SVG target turbin
        turbineSvg.querySelectorAll('circle, path').forEach(el => {
            el.style.stroke = color;
            el.style.filter = `drop-shadow(0 0 8px ${color})`;
        });
        
        // Memicu trigger reflow browser agar animasi restart mulus
        void turbineSvg.offsetWidth;
        
        // Aktifkan putaran Turbin Atas & Sistem Aliran Pompa Bawah
        turbineSvg.classList.add('spinning');
        pumpIcon.classList.add('pump-spinning');
        flow1.classList.add('flowing');
        flow2.classList.add('flowing');
        
        statusText.innerText = "TURBINE STATUS: ACTIVE";
        statusText.style.color = color;
        
    } else {
        // JIKA DAYA 0.00 kW -> MATIKAN & SELESAI
        turbineSvg.querySelectorAll('circle, path').forEach(el => {
            el.style.stroke = "#38bdf8";
            el.style.filter = "none";
        });
        
        statusText.innerText = "TURBINE STATUS: IDLE";
        statusText.style.color = "#38bdf8";
    }
}