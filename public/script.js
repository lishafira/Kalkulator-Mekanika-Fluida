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
  const kwText = document.getElementById('kw');
  const dataBoxTitle = document.getElementById('sP')?.parentElement?.querySelector('b');
  const dataBoxNum = document.getElementById('sP');
  const dataBoxUnit = document.getElementById('sP')?.parentElement?.querySelector('small');
  const graphicElements = [rotor, flow];
  graphicElements.forEach(el => {
    if (el) el.classList.remove('status-idle', 'status-low', 'status-high');
  });
  
  const textElements = [kwText, dataBoxTitle, dataBoxNum, dataBoxUnit];
  textElements.forEach(el => {
    if (el) el.classList.remove('status-idle-txt', 'status-low-txt', 'status-high-txt');
  });

  if (powerKW === 0) {
    if(rotor) rotor.style.animationPlayState = 'paused';
    if(flow) flow.style.animationPlayState = 'paused';
    
    graphicElements.forEach(el => el?.classList.add('status-idle'));
    textElements.forEach(el => el?.classList.add('status-idle-txt'));

  } else {
    if(rotor) rotor.style.animationPlayState = 'running';
    if(flow) flow.style.animationPlayState = 'running';
    let speedFactor = Math.max(0.12, 1.8 - (powerKW / 15)); 
    if(rotor) rotor.style.animationDuration = speedFactor + 's';
    if(flow) flow.style.animationDuration = (speedFactor * 1.2) + 's';
    
    if (powerKW > 0 && powerKW <= 5) {
      // 2. Daya Rendah (0 s.d 5 kW) -> Putaran Pelan & Berwarna Kuning Amber
      graphicElements.forEach(el => el?.classList.add('status-low'));
      textElements.forEach(el => el?.classList.add('status-low-txt'));
    } else {
      // 3. Daya Tinggi/Optimal (> 5 kW) -> Putaran Cepat & Berwarna Cyan Elektrik
      graphicElements.forEach(el => el?.classList.add('status-high'));
      textElements.forEach(el => el?.classList.add('status-high-txt'));
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