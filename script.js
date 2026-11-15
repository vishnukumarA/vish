
// ===================================
// PERSONALIZATION
// ===================================

const HER_NAME = "mudhuuuu 💗";
const BIRTHDAY_DATE = "2026-11-17T00:00:00";

// Update names
document.getElementById("personName").textContent = HER_NAME;


// ===================================
// LOADER
// ===================================

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";

        setTimeout(() => loader.remove(), 800);
    }, 1500);
});


// ===================================
// START EXPERIENCE
// ===================================

function startExperience() {
    document.getElementById("countdown").scrollIntoView({
        behavior: "smooth"
    });

    if (!musicPlaying) {
        toggleMusic();
    }

    celebrate();
}


// ===================================
// COUNTDOWN
// ===================================

function updateCountdown() {

    const target = new Date(BIRTHDAY_DATE).getTime();
    const now = Date.now();

    let difference = target - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===================================
// CANDLE INTERACTION
// ===================================

let candlesBlown = 0;

function blowCandle(candle) {

    const flame = candle.querySelector(".flame");

    if (!flame.classList.contains("off")) {
        flame.classList.add("off");
        candlesBlown++;
    }

    if (candlesBlown === 3) {
        document.getElementById("cakeMessage").textContent =
            "Your wish is on its way! 🌟";

        celebrate();
    }
}


// ===================================
// LETTER INTERACTION
// ===================================

function openLetter() {

    const letter = document.getElementById("letter");

    letter.classList.toggle("show");

    if (letter.classList.contains("show")) {
        letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


// ===================================
// BACKGROUND PARTICLES
// ===================================

const particleContainer = document.getElementById("particles");

function createParticle() {

    const particle = document.createElement("div");

    const symbols = ["💗", "💕", "✨", "🌸", "♡"];

    particle.className = "particle";
    particle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.fontSize = (12 + Math.random() * 22) + "px";
    particle.style.animationDuration = (5 + Math.random() * 6) + "s";

    particleContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 11000);
}

setInterval(createParticle, 500);


// ===================================
// CONFETTI
// ===================================

function celebrate() {

    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        "#ff4f96",
        "#ffcf56",
        "#a78bfa",
        "#ff91bd",
        "#ffffff"
    ];

    let particles = [];

    for (let i = 0; i < 180; i++) {

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 3,
            speed: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    let frame = 0;

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            ctx.fillStyle = p.color;

            ctx.fillRect(p.x, p.y, p.size, p.size);

            p.y += p.speed;
            p.x += Math.sin(p.y / 20);

        });

        frame++;

        if (frame < 180) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}


// ===================================
// BACKGROUND MUSIC
// ===================================

let musicPlaying = false;

function toggleMusic() {

    const music = document.getElementById("birthdayMusic");
    const button = document.getElementById("musicBtn");

    if (!musicPlaying) {
        music.volume = 1;
        music.play().then(() => {
            musicPlaying = true;
            button.textContent = "♫ Music ON";
        }).catch(error => {
            console.error("Could not play birthday music.", error);
            button.textContent = "Music unavailable";
        });

    } else {

        music.pause();
        musicPlaying = false;
        button.textContent = "♫ Music";
    }
}


// ===================================
// FINAL CELEBRATION
// ===================================

window.addEventListener("resize", () => {

    const canvas = document.getElementById("confetti");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
