let turbineTween = gsap.to("#turbineSVG", {
    rotation: 360,
    duration: 12,
    repeat: -1,
    ease: "none"
});

let waterTween = gsap.to("#waterFlow", {
    backgroundPosition: "0px 60px",
    duration: 3,
    repeat: -1,
    ease: "none"
});

async function calculatePower() {
    const debit = parseFloat(document.getElementById('debit').value);
    const head = parseFloat(document.getElementById('head').value);
    const efisiensi = parseFloat(document.getElementById('efisiensi').value);

    if (isNaN(debit) || isNaN(head) || isNaN(efisiensi)) {
        alert("Harap masukkan seluruh parameter dengan valid!");
        return;
    }

    try {
        gsap.fromTo(".btn-calculate", { scale: 0.96 }, { scale: 1, duration: 0.1 });

        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ debit, head, efisiensi })
        });

        const data = await response.json();
        const powerInKW = (data.power / 1000).toFixed(2);
        const powerValue = parseFloat(powerInKW);

        animateResultCounter(powerValue);

        if (powerValue > 0) {

            let newTurbineDuration = Math.max(0.15, 6 - (powerValue / 220));
            let newWaterDuration = Math.max(0.1, 2.5 - (powerValue / 450));
            gsap.to(turbineTween, { timeScale: 12 / newTurbineDuration, duration: 1.6, ease: "power2.out" });
            gsap.to(waterTween, { timeScale: 3 / newWaterDuration, duration: 1.6, ease: "power2.out" });
            let glowIntensity = Math.min(35, 10 + (powerValue / 60));
            let energyColor = "#38bdf8"; // Tingkat 1: Biru Cyan (< 500 kW)
            if (powerValue > 500 && powerValue <= 2000) {
                energyColor = "#4ade80"; // Tingkat 2: Hijau Neon (500 - 2000 kW)
            } else if (powerValue > 2000) {
                energyColor = "#f59e0b"; // Tingkat 3: Amber Oranye (> 2000 kW)
            }

            gsap.to("#turbineSVG", {
                filter: `drop-shadow(0 0 ${glowIntensity}px ${energyColor})`,
                duration: 1.2
            });
            
            gsap.to("#turbineSVG .blade, #turbineSVG .turbine-core", {
                stroke: energyColor,
                duration: 1.2
            });

            gsap.to(".result-display", {
                borderColor: energyColor,
                duration: 1.2
            });

            if (powerValue > 1500) {
                gsap.fromTo(".visual-panel", 
                    { x: -1.5 }, 
                    { x: 1.5, duration: 0.04, repeat: 12, yoyo: true, clearProps: "x" }
                );
            }
        } else {
            resetToIdleState();
        }

    } catch (error) {
        console.error("Koneksi server terputus:", error);
        alert("Gagal terhubung dengan server.");
    }
}

function animateResultCounter(targetValue) {
    let counterObj = { value: 0 };
    gsap.to(counterObj, {
        value: targetValue,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: function () {
            document.getElementById('result').innerText = `${counterObj.value.toFixed(2)} kW`;
        }
    });
}

function resetToIdleState() {
    gsap.to(turbineTween, { timeScale: 1, duration: 2, ease: "power1.inOut" });
    gsap.to(waterTween, { timeScale: 1, duration: 2, ease: "power1.inOut" });
    gsap.to("#turbineSVG", { filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.4))", duration: 1.2 });
    gsap.to("#turbineSVG .blade, #turbineSVG .turbine-core", { stroke: "#38bdf8", duration: 1.2 });
    gsap.to(".result-display", { borderColor: "rgba(56, 189, 248, 0.2)", duration: 1.2 });
    document.getElementById('result').innerText = "0.00 kW";
}