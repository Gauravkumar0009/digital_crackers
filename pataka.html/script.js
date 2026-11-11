/* =================================
   FIREWORKS WORLD
   DIGITAL ANIMATION ENGINE
================================= */


/* =================================
   CANVAS SETUP
================================= */

const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");

let particles = [];

let animationFrame;

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =================================
   COLOURS
================================= */

const colors = [
    "#ffd700",
    "#ff4500",
    "#00ffff",
    "#ff00ff",
    "#00ff66",
    "#ffffff",
    "#ff8800",
    "#a855f7"
];

function randomColor() {

    return colors[
        Math.floor(Math.random() * colors.length)
    ];

}

function random(min, max) {

    return Math.random() * (max - min) + min;

}


/* =================================
   PARTICLE CLASS
================================= */

class Particle {

    constructor(x, y, color, speed, angle, gravity = 0.06) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.alpha = 1;

        this.size = random(1, 3.5);

        this.gravity = gravity;

        this.friction = 0.985;

        this.decay = random(0.008, 0.018);

    }


    update() {

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.vy += this.gravity;

        this.x += this.vx;
        this.y += this.vy;

        this.alpha -= this.decay;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha = Math.max(0, this.alpha);

        ctx.fillStyle = this.color;

        ctx.shadowBlur = 12;

        ctx.shadowColor = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


/* =================================
   GENERAL EXPLOSION
================================= */

function explosion(x, y, count = 100, color = null) {

    const selectedColor = color || randomColor();

    for (let i = 0; i < count; i++) {

        const angle = Math.PI * 2 * i / count;

        const speed = random(2, 8);

        particles.push(
            new Particle(
                x,
                y,
                selectedColor,
                speed,
                angle
            )
        );

    }

    playBoom();

}


/* =================================
   STAR EXPLOSION
================================= */

function starExplosion(x, y) {

    const count = 150;

    for (let i = 0; i < count; i++) {

        const angle = i * Math.PI * 2 / count;

        const speed = random(3, 8);

        particles.push(
            new Particle(
                x,
                y,
                colors[i % colors.length],
                speed,
                angle
            )
        );

    }

    playBoom();

}


/* =================================
   ROCKET ANIMATION
================================= */

function launchRocket() {

    playLaunch();

    const x = random(
        100,
        window.innerWidth - 100
    );

    const startY = window.innerHeight + 20;

    const targetY = random(
        100,
        window.innerHeight * 0.4
    );

    let y = startY;

    const timer = setInterval(() => {

        y -= 12;

        for (let i = 0; i < 4; i++) {

            particles.push(
                new Particle(
                    x + random(-4, 4),
                    y + 20,
                    "#ffd700",
                    random(1, 3),
                    Math.PI / 2
                )
            );

        }

        if (y <= targetY) {

            clearInterval(timer);

            starExplosion(x, y);

            setTimeout(() => {
                explosion(x, y, 60);
            }, 150);

        }

    }, 20);

}


/* =================================
   SKY SHOT
================================= */

function skyShot() {

    const x = random(100, window.innerWidth - 100);

    const y = random(100, window.innerHeight * 0.45);

    explosion(x, y, 180);

    setTimeout(() => {

        explosion(
            x + 50,
            y - 40,
            80,
            "#00ffff"
        );

    }, 250);

}


/* =================================
   PHULJHADI
================================= */

function phuljhadi() {

    const x = window.innerWidth / 2;

    const y = window.innerHeight / 2;

    playSparkle();

    for (let i = 0; i < 160; i++) {

        const angle = random(0, Math.PI * 2);

        particles.push(
            new Particle(
                x + random(-20, 20),
                y + random(-20, 20),
                "#ffd700",
                random(1, 7),
                angle
            )
        );

    }

}


/* =================================
   ANAR FOUNTAIN
================================= */

function anar() {

    playFountain();

    const x = window.innerWidth / 2;

    const y = window.innerHeight - 50;

    let bursts = 0;

    const fountain = setInterval(() => {

        for (let i = 0; i < 18; i++) {

            const angle = random(-2.2, -0.9);

            particles.push(
                new Particle(
                    x + random(-8, 8),
                    y,
                    randomColor(),
                    random(4, 10),
                    angle,
                    0.12
                )
            );

        }

        bursts++;

        if (bursts >= 15) {

            clearInterval(fountain);

        }

    }, 80);

}


/* =================================
   CHAKRI
================================= */

function chakri() {

    playSpin();

    const x = window.innerWidth / 2;

    const y = window.innerHeight / 2;

    for (let i = 0; i < 250; i++) {

        const angle = i * 0.12;

        const speed = random(2, 7);

        particles.push(
            new Particle(
                x,
                y,
                colors[i % colors.length],
                speed,
                angle,
                0.01
            )
        );

    }

}


/* =================================
   SUTLI BOMB
================================= */

function sutliBomb() {

    const x = window.innerWidth / 2;

    const y = window.innerHeight / 2;

    setTimeout(() => {

        explosion(x, y, 220, "#ff4500");

        setTimeout(() => {

            explosion(
                x,
                y,
                120,
                "#ffd700"
            );

        }, 180);

    }, 500);

    playBoom();

}


/* =================================
   1000 WALA
================================= */

function thousandWala() {

    let count = 0;

    const interval = setInterval(() => {

        explosion(
            random(100, window.innerWidth - 100),
            random(100, window.innerHeight - 100),
            35
        );

        count++;

        if (count >= 18) {

            clearInterval(interval);

        }

    }, 180);

}


/* =================================
   MEGA BLAST
================================= */

function megaBlast() {

    let count = 0;

    const interval = setInterval(() => {

        starExplosion(
            random(100, window.innerWidth - 100),
            random(100, window.innerHeight * 0.65)
        );

        count++;

        if (count >= 12) {

            clearInterval(interval);

        }

    }, 250);

}


/* =================================
   ANIMATION LOOP
================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for (let i = particles.length - 1; i >= 0; i--) {

        const particle = particles[i];

        particle.update();

        particle.draw();

        if (particle.alpha <= 0) {

            particles.splice(i, 1);

        }

    }

    animationFrame = requestAnimationFrame(animate);

}

animate();


/* =================================
   DIGITAL AUDIO ENGINE
================================= */

const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

const audio = new AudioContextClass();

const masterGain = audio.createGain();

masterGain.gain.value = 0.6;

masterGain.connect(audio.destination);

let soundEnabled = true;

let musicEnabled = false;

let musicTimer = null;

let musicGain = null;


/* =================================
   AUDIO START
================================= */

async function startAudio() {

    if (audio.state === "suspended") {

        await audio.resume();

    }

}


/* =================================
   DIGITAL BOOM SOUND
================================= */

function playBoom() {

    if (!soundEnabled) return;

    startAudio();

    const duration = 0.7;

    const length = Math.floor(
        audio.sampleRate * duration
    );

    const buffer = audio.createBuffer(
        1,
        length,
        audio.sampleRate
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {

        data[i] = (Math.random() * 2 - 1) *
            Math.pow(1 - i / length, 2);

    }

    const source = audio.createBufferSource();

    source.buffer = buffer;

    const filter = audio.createBiquadFilter();

    filter.type = "lowpass";

    filter.frequency.value = 700;

    const gain = audio.createGain();

    gain.gain.setValueAtTime(
        0.8,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + duration
    );

    source.connect(filter);

    filter.connect(gain);

    gain.connect(masterGain);

    source.start();

}


/* =================================
   ROCKET LAUNCH SOUND
================================= */

function playLaunch() {

    if (!soundEnabled) return;

    startAudio();

    const oscillator = audio.createOscillator();

    const gain = audio.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(
        500,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        80,
        audio.currentTime + 0.8
    );

    gain.gain.setValueAtTime(
        0.18,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.8
    );

    oscillator.connect(gain);

    gain.connect(masterGain);

    oscillator.start();

    oscillator.stop(audio.currentTime + 0.8);

}


/* =================================
   SPARKLE SOUND
================================= */

function playSparkle() {

    if (!soundEnabled) return;

    startAudio();

    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            if (!soundEnabled) return;

            const oscillator = audio.createOscillator();

            const gain = audio.createGain();

            oscillator.type = "sine";

            oscillator.frequency.value =
                random(900, 1800);

            gain.gain.setValueAtTime(
                0.08,
                audio.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audio.currentTime + 0.15
            );

            oscillator.connect(gain);

            gain.connect(masterGain);

            oscillator.start();

            oscillator.stop(audio.currentTime + 0.15);

        }, i * 100);

    }

}


/* =================================
   FOUNTAIN SOUND
================================= */

function playFountain() {

    if (!soundEnabled) return;

    startAudio();

    const oscillator = audio.createOscillator();

    const gain = audio.createGain();

    oscillator.type = "triangle";

    oscillator.frequency.value = 180;

    gain.gain.setValueAtTime(
        0.12,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 1.5
    );

    oscillator.connect(gain);

    gain.connect(masterGain);

    oscillator.start();

    oscillator.stop(audio.currentTime + 1.5);

    playSparkle();

}


/* =================================
   CHAKRI SOUND
================================= */

function playSpin() {

    if (!soundEnabled) return;

    startAudio();

    const oscillator = audio.createOscillator();

    const gain = audio.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(
        150,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        700,
        audio.currentTime + 1
    );

    gain.gain.setValueAtTime(
        0.1,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 1
    );

    oscillator.connect(gain);

    gain.connect(masterGain);

    oscillator.start();

    oscillator.stop(audio.currentTime + 1);

}


/* =================================
   VOLUME CONTROL
================================= */

function changeVolume(value) {

    const volume = value / 100;

    masterGain.gain.setTargetAtTime(
        volume,
        audio.currentTime,
        0.05
    );

    document.getElementById("volumeValue").innerText =
        value + "%";

}


/* =================================
   SOUND TOGGLE
================================= */

function toggleSound() {

    soundEnabled = !soundEnabled;

    document.getElementById("soundButton").innerText =
        soundEnabled
            ? "🔊 SOUND ON"
            : "🔇 SOUND OFF";

}


/* =================================
   BACKGROUND MUSIC
================================= */

function toggleMusic() {

    startAudio();

    if (!musicEnabled) {

        musicEnabled = true;

        musicGain = audio.createGain();

        musicGain.gain.value = 0.08;

        musicGain.connect(masterGain);

        const notes = [
            261.63,
            329.63,
            392.00,
            523.25,
            392.00,
            329.63
        ];

        let index = 0;

        function playMusicNote() {

            if (!musicEnabled) return;

            const oscillator = audio.createOscillator();

            const noteGain = audio.createGain();

            oscillator.type = "sine";

            oscillator.frequency.value =
                notes[index % notes.length];

            noteGain.gain.setValueAtTime(
                0.3,
                audio.currentTime
            );

            noteGain.gain.exponentialRampToValueAtTime(
                0.001,
                audio.currentTime + 0.45
            );

            oscillator.connect(noteGain);

            noteGain.connect(musicGain);

            oscillator.start();

            oscillator.stop(audio.currentTime + 0.45);

            index++;

        }

        playMusicNote();

        musicTimer = setInterval(
            playMusicNote,
            450
        );

        document.getElementById("musicButton").innerText =
            "⏸ STOP MUSIC";

    } else {

        musicEnabled = false;

        clearInterval(musicTimer);

        musicGain.disconnect();

        document.getElementById("musicButton").innerText =
            "▶ PLAY MUSIC";

    }

}