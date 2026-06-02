// variabel buat nyimpen status indikator dll
let isSeatbeltOn = false;
let lightState = 0;
let seinLeftActive = false;
let seinRightActive = false;
let currentGear = "N";
const gears = ["N", "1", "2", "3", "4", "5", "R"];
let gearIndex = 0;
let endingDisplay = false;

// layar welcome muncul 3 detik trus ilang sendiri
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('welcome-screen').classList.remove('active');
    }, 3000);
});

// layar ending muncul 3 detik saat mesin mati 
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('ending-screen').classList.remove('active');
    }, 3000); 
});

// fungsi utama buat update semua data di HUD
function updateVehicleHUD(speed, rpm, fuel, health, gear, seatbelt, lights, seinL, seinR) {
    // update kecepatan
    document.getElementById('speed').innerText = Math.round(speed);

    // update tampilan RPM 4 digit
    const rpmStr = String(Math.round(rpm)).padStart(4, '0').slice(-4);
    document.getElementById('rpm-d1').innerText = rpmStr[0];
    document.getElementById('rpm-d2').innerText = rpmStr[1];
    document.getElementById('rpm-d3').innerText = rpmStr[2];
    document.getElementById('rpm-d4').innerText = rpmStr[3];

    // update bar bensin sama kesehatan kendaraan
    document.getElementById('fuel-bar').style.width = fuel + '%';
    document.getElementById('health-bar').style.width = health + '%';

    // update gigi transmisi
    document.getElementById('gear').innerText = gear || currentGear;

    // update indikator seatbelt sama lampu
    updateIndicator('seatbelt-icon', seatbelt, 'indicator-on', 'indicator-off');
    updateIndicator('lights-icon', lights > 0, 'indicator-on', 'indicator-off');

    // update sein kiri kanan
    handleSein('sein-l', seinL);
    handleSein('sein-r', seinR);
}

function updateIndicator(id, active, onClass, offClass) {
    const el = document.getElementById(id);
    if (active) {
        el.classList.add(onClass);
        el.classList.remove(offClass);
    } else {
        el.classList.add(offClass);
        el.classList.remove(onClass);
    }
}

function handleSein(id, active) {
    const el = document.getElementById(id);
    if (active) {
        el.classList.add('sein-active');
        el.classList.remove('indicator-off');
    } else {
        el.classList.remove('sein-active');
        el.classList.add('indicator-off');
    }
}

// logika buat testing pake keyboard
// Arrow Kiri = Sein Kiri, Arrow Kanan = Sein Kanan
// Z = Seatbelt, H = Lampu, G = Ganti Gear
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') seinLeftActive = !seinLeftActive;
    if (e.key === 'ArrowRight') seinRightActive = !seinRightActive;
    if (e.key.toLowerCase() === 'z') isSeatbeltOn = !isSeatbeltOn;
    if (e.key.toLowerCase() === 'h') lightState = lightState === 0 ? 1 : 0;
    if (e.key.toLowerCase() === 'g') {
        gearIndex = (gearIndex + 1) % gears.length;
        currentGear = gears[gearIndex];
    }
});

// data dummy buat testing, ntar diganti data asli dari server
setInterval(() => {
    if (document.getElementById('welcome-screen').classList.contains('active')) return;

    let dummySpeed = Math.floor(Math.random() * 280);
    let dummyRPM = Math.floor(Math.random() * 8000);
    let dummyFuel = 85;
    let dummyHealth = 98;

    updateVehicleHUD(dummySpeed, dummyRPM, dummyFuel, dummyHealth, currentGear, isSeatbeltOn, lightState, seinLeftActive, seinRightActive);
}, 200);