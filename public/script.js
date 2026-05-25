let turbineTween = gsap.to("#turbineSVG", {
    rotation: 360,
    duration: 4,
    repeat: -1,
    ease: "none"
});

async function calculatePower() {
    const debit = parseFloat(document.getElementById('debit').value) || 0;
    const head = parseFloat(document.getElementById('head').value) || 0;
    const efisiensi = parseFloat(document.getElementById('efisiensi').value) || 0;

    if (debit <= 0 || head <= 0) {
        alert("Mohon masukkan nilai Debit dan Head yang valid.");
        return;
    }

    const power = 9.81 * debit * head * (efisiensi / 100);
    updateResultUI(power);
    updateTurbineAnimation(power);
}

function updateResultUI(power) {
    gsap.to("#result", {
        duration: 0.8,
        textContent: power.toFixed(2) + " kW",
        roundProps: "textContent",
        ease: "power2.out"
    });
}

function updateTurbineAnimation(power) {
    const speed = Math.max(0.5, 4 - (power / 1000));
    
    gsap.to(turbineTween, {
        duration: 1,
        timeScale: 4 / speed
    });
}