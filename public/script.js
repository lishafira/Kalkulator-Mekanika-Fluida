const rho = 1000, g = 9.81;

function formatNum(n, d = 2) {
  return Number(n).toLocaleString('id-ID', {minimumFractionDigits: d, maximumFractionDigits: d});
}

function calc() {
  const Q = parseFloat(document.getElementById('q').value) || 0;
  const H = parseFloat(document.getElementById('h').value) || 0;
  const etaPct = parseFloat(document.getElementById('eta').value) || 0;
  const eta = etaPct / 100;
  
  // P = rho * g * Q * H * eta
  const P = rho * g * Q * H * eta;
  const powerKW = P / 1000;
  
  document.getElementById('kw').textContent = formatNum(powerKW, 2) + ' kW';
  document.getElementById('watt').textContent = '≈ ' + Math.round(P).toLocaleString('id-ID') + ' Watt';
  document.getElementById('sQ').textContent = Q;
  document.getElementById('sH').textContent = H;
  document.getElementById('sE').textContent = etaPct;
  document.getElementById('sP').textContent = formatNum(powerKW, 2);
  
  const rotor = document.getElementById('turbine-rotor');
  const flow = document.getElementById('fluid-flow');
  const drain = document.getElementById('drain-flow');
  
  if (P > 0) {
    let speedFactor = Math.max(0.12, 1.8 - (powerKW / 15)); 
    rotor.style.animationPlayState = 'running';
    flow.style.style.animationPlayState = 'running';
    if(drain) drain.style.animationPlayState = 'running';
    
    // Semakin tinggi daya, putaran rotor semakin cepat
    rotor.style.animationDuration = speedFactor + 's';
    flow.style.animationDuration = (speedFactor * 1.2) + 's';
  } else {
    // Jika tidak ada aliran daya (0), hentikan animasi (Idle State)
    rotor.style.animationPlayState = 'paused';
    flow.style.animationPlayState = 'paused';
    if(drain) drain.style.animationPlayState = 'paused';
  }
}

// Logika Tombol Reset
function resetCalc() {
  document.getElementById('q').value = 0.02;
  document.getElementById('h').value = 25;
  document.getElementById('eta').value = 75;
  calc();
}

['q', 'h', 'eta'].forEach(id => {
    const element = document.getElementById(id);
    if(element) element.addEventListener('input', calc);
});

calc();