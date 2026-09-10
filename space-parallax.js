const canvas = document.getElementById("space-parallax");
const context = canvas.getContext("2d");

let stars = [];
let scrollPos = 0;
const STAR_COUNT = 120;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        brightness: Math.random() * 0.5 + 0.5,
        weight: Math.random() * 0.5 + 0.1
    }
}

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar());
    }
}

function drawStars() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const scrollPos = window.scrollY;

    for (const star of stars) {
        const y = (((star.y - scrollPos * star.weight) % canvas.height) + canvas.height) % canvas.height;
        if (star.radius > 1.1) {
            const glow = context.createRadialGradient(
                star.x, y, 0,
                star.x, y, star.radius * 5
            );
            glow.addColorStop(0, `rgba(255,255,255,${star.brightness * 0.3})`);
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
        context.fillStyle =
            `rgba(255,255,255,${star.brightness})`;
        context.arc(
            star.x, y, star.radius,
            0, Math.PI * 2
        );
        context.fill();
    }
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

createStars();
animate();