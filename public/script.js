const rho = 1000, g = 9.81;

function formatNum(n, d = 2) {
  return Number(n).toLocaleString('id-ID', {minimumFractionDigits: d, maximumFractionDigits: d});
}

function calc() {
  const Q = parseFloat(document.getElementById('q').value) || 0;
  const H = parseFloat(document.getElementById('h').value) || 0;
  const etaPct = parseFloat(document.getElementById('eta').value) || 0;
  const eta = etaPct / 100;
  
  // Perhitungan Daya Turbin (Watt)
  const P = rho * g * Q * H * eta;
  const powerKW = P / 1000;
  
  document.getElementById('kw').textContent = formatNum(powerKW, 2) + ' kW';
  document.getElementById('watt').textContent = '≈ ' + Math.round(P).toLocaleString('id-ID') + ' Watt';
  document.getElementById('sQ').textContent = Q;
  document.getElementById('sH').textContent = H;
  document.getElementById('sE').textContent = etaPct;
  document.getElementById('sP').textContent = formatNum(powerKW, 2);
  
  // Ambil elemen SVG untuk manipulasi visual
  const rotor = document.getElementById('turbine-rotor');
  const flow = document.getElementById('fluid-flow');
  const drain = document.getElementById('drain-flow');
  const powerStatText = document.getElementById('sP')?.parentElement; // Box angka output bawah
  const elementsToColor = [rotor, flow, powerStatText];
  elementsToColor.forEach(el => {
    if (el) el.classList.remove('status-idle', 'status-low', 'status-high');
  });

  // LOGIKA INDIKATOR WARNA DAN KECEPATAN
  if (powerKW === 0) {
    // 1. Kondisi Mati / Idle (0 kW)
    rotor.style.animationPlayState = 'paused';
    flow.style.animationPlayState = 'paused';
    if(drain) drain.style.animationPlayState = 'paused';
    
    elementsToColor.forEach(el => el?.classList.add('status-idle'));

  } else {
    rotor.style.animationPlayState = 'running';
    flow.style.animationPlayState = 'running';
    if(drain) drain.style.animationPlayState = 'running';
    
    let speedFactor = Math.max(0.12, 1.8 - (powerKW / 15)); 
    rotor.style.animationDuration = speedFactor + 's';
    flow.style.animationDuration = (speedFactor * 1.2) + 's';
    
    if (powerKW > 0 && powerKW <= 5) {
      // Daya Rendah -> Warna Kuning Amber
      elementsToColor.forEach(el => el?.classList.add('status-low'));
    } else {
      // Daya Tinggi/Optimal (> 5 kW) -> Warna Cyan Terang
      elementsToColor.forEach(el => el?.classList.add('status-high'));
    }
  }
}

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