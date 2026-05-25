let turbine = gsap.to("#turbineSVG", { rotation: 360, duration: 4, repeat: -1, ease: "none" });

async function calculatePower() {
    const d = document.getElementById('debit').value;
    const h = document.getElementById('head').value;
    const e = document.getElementById('efisiensi').value;

    const res = await fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ debit: d, head: h, efisiensi: e })
    });
    
    const data = await res.json();
    const kw = (data.power / 1000).toFixed(2);
    
    gsap.to("#result", { textContent: kw, duration: 1, roundProps: "textContent", onUpdate: function() {
        this.targets()[0].innerText = this.targets()[0].innerText + " kW";
    }});

    let speed = Math.max(0.15, 4 - (kw / 400));
    gsap.to(turbine, { timeScale: 4 / speed, duration: 1, ease: "power2.out" });

    let color = kw > 2000 ? "#f59e0b" : (kw > 500 ? "#4ade80" : "#38bdf8");
    gsap.to("#turbineSVG", { stroke: color, filter: `drop-shadow(0 0 20px ${color})`, duration: 0.8 });
}