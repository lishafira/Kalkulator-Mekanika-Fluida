// ==========================================================================
// INITIAL ANIMATION SETUP (KONFIGURASI AWAL ANIMASI AMBIENT)
// ==========================================================================

// 1. Animasi Turbin Berputar Lambat saat Idle (Ambient Rotation)
let turbineTween = gsap.to("#turbineSVG", {
    rotation: 360,
    duration: 12,
    repeat: -1,
    ease: "none"
});

// 2. Animasi Aliran Air Lambat (Idle Water Flow)
let waterTween = gsap.to("#waterFlow", {
    backgroundPosition: "0px 60px",
    duration: 3,
    repeat: -1,
    ease: "none"
});

// ==========================================================================
// MAIN CALCULATION & INTERACTIVE ANIMATION LOGIC
// ==========================================================================
async function calculatePower() {
    const debit = parseFloat(document.getElementById('debit').value);
    const head = parseFloat(document.getElementById('head').value);
    const efisiensi = parseFloat(document.getElementById('efisiensi').value);

    // Validasi Input
    if (isNaN(debit) || isNaN(head) || isNaN(efisiensi)) {
        alert("Harap masukkan semua parameter spesifikasi teknik dengan benar!");
        return;
    }

    try {
        // Efek transisi tombol saat ditekan
        gsap.fromTo("button", { scale: 0.95 }, { scale: 1, duration: 0.1 });

        // Request data hasil kalkulasi dari backend Express
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ debit, head, efisiensi })
        });

        const data = await response.json();
        const powerInKW = (data.power / 1000).toFixed(2);
        const powerValue = parseFloat(powerInKW);

        // Tampilkan hasil numerik dengan efek menghitung naik (Counter Effect)
        animateResultCounter(powerValue);

        // --- DINAMIKA ANIMASI BERDASARKAN OUTPUT DAYA ---
        if (powerValue > 0) {
            // Pemetaan logika mekanika fluida ke durasi visual animasi
            // Semakin besar daya (kW), semakin cepat putaran (durasi menuju 0.2s)
            let newTurbineDuration = Math.max(0.15, 6 - (powerValue / 200));
            let newWaterDuration = Math.max(0.1, 2.5 - (powerValue / 400));

            // Mengubah kecepatan putaran secara halus (smooth acceleration)
            gsap.to(turbineTween, { timeScale: 12 / newTurbineDuration, duration: 1.5, ease: "power2.out" });
            gsap.to(waterTween, { timeScale: 3 / newWaterDuration, duration: 1.5, ease: "power2.out" });

            // Efek Pendaran Dinamis (Dynamic Glowing State) berdasarkan level energi
            let glowIntensity = Math.min(40, 10 + (powerValue / 50));
            let energyColor = "#38bdf8"; // Default cyan untuk daya rendah

            if (powerValue > 500 && powerValue <= 2000) {
                energyColor = "#4ade80"; // Hijau untuk daya sedang-tinggi
            } else if (powerValue > 2000) {
                energyColor = "#f59e0b"; // Amber/Orange untuk daya masif
            }

            // Eksekusi animasi perubahan visual komponen elektro-mekanis
            gsap.to("#turbineSVG", {
                filter: `drop-shadow(0 0 ${glowIntensity}px ${energyColor})`,
                duration: 1
            });
            
            gsap.to("#turbineSVG path, #turbineSVG stroke", {
                stroke: energyColor,
                duration: 1
            });

            gsap.to("#result", {
                color: energyColor,
                scale: 1.1,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });

            // Efek guncangan generator (Generator Vibration) jika daya sangat besar
            if (powerValue > 1500) {
                gsap.fromTo(".visual-section", 
                    { x: -1 }, 
                    { x: 1, duration: 0.05, repeat: 10, yoyo: true, clearProps: "x" }
                );
            }
        } else {
            // Jika daya 0, kembalikan ke kondisi idle/diam
            resetToIdleState();
        }

    } catch (error) {
        console.error("Gagal sinkronisasi dengan backend:", error);
        alert("Terjadi pemutusan komunikasi dengan server lokal.");
    }
}

// ==========================================================================
// HELPER FUNCTIONS (FUNGSI PEMBANTU INTERAKSI)
// ==========================================================================

// Fungsi untuk membuat efek angka berhitung naik dari 0 kW hingga target kW
function animateResultCounter(targetValue) {
    let counterObj = { value: 0 };
    gsap.to(counterObj, {
        value: targetValue,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: function () {
            document.getElementById('result').innerText = `${counterObj.value.toFixed(2)} kW`;
        }
    });
}

// Fungsi mengembalikan animasi ke mode hemat energi jika input kosong/nol
function resetToIdleState() {
    gsap.to(turbineTween, { timeScale: 1, duration: 2, ease: "power1.inOut" });
    gsap.to(waterTween, { timeScale: 1, duration: 2, ease: "power1.inOut" });
    gsap.to("#turbineSVG", { filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))", duration: 1 });
    gsap.to("#result", { color: "#38bdf8", duration: 1 });
    document.getElementById('result').innerText = "0.00 kW";
}