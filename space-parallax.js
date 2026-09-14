const canvas = document.getElementById("space-parallax");
const context = canvas.getContext("2d");

let stars = [];
const STAR_DENSITY = 1 / 1800;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
console.log(canvas.width, canvas.height);

function getStarCount() {
    return canvas.width * canvas.height * STAR_DENSITY;
}

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        brightness: Math.random() * 0.5 + 0.5,
        weight: Math.random() * 0.5 + 0.1,
        nextBlink: performance.now() + Math.random() * 16000,
        blinking: false,
        blinkStart: 0,
        blinkDuration: 700
    }
}

function createStars() {
    stars = [];
    for (let i = 0; i < getStarCount(); i++) {
        stars.push(createStar());
    }
}

function drawStars() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const scrollPos = window.scrollY;
    const now = performance.now();

    for (const star of stars) {
        const y = (((star.y - scrollPos * star.weight) % canvas.height) + canvas.height) % canvas.height;     
        let opacity = star.brightness;
        if (!star.blinking && now >= star.nextBlink) {
            star.blinking = true;
            star.blinkStart = now;
        }
        if (star.blinking) {
            const progress = (now - star.blinkStart) / star.blinkDuration;
            if (progress >= 1) {
                star.blinking = false;
                star.nextBlink = now + Math.random() * 10000 + 6000;
            } 
            else {
                const blink = Math.sin(progress * Math.PI);
                opacity = star.brightness * (1 - blink * 0.9);
            }
        }
        if (star.radius > 1.1) {
            const glow = context.createRadialGradient(
                star.x, y, 0,
                star.x, y, star.radius * 5
            );
            glow.addColorStop(0, `rgba(255,255,255,${opacity * 0.3})`);
            glow.addColorStop(1, "rgba(255,255,255,0)");
            context.beginPath();
            context.fillStyle = glow;
            context.arc(
                star.x, y, star.radius * 5,
                0, Math.PI * 2
            );
            context.fill(); 
        }
        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${opacity})`;
        context.arc(
            star.x, y, star.radius,
            0, Math.PI * 2
        );
        context.fill();
    }
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth; 
    canvas.height = canvas.clientHeight; 
    createStars();
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

createStars();
animate();