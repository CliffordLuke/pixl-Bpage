


/* Borrowed Code Particles by Matteo Bruni*/

const canvas = document.getElementById("PARTICLES");
const twoDi = canvas.getContext("2d");

function resizeCanvas () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas ();

window.addEventListener("resize", resizeCanvas);

const particles = [];



class Particle {
  constructor () {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;

    this.startX = this.x;

    this.size = 0.1;
    this.maxSize = 50;

    this.speedY = Math.random() * 2 + 3;

    this.growthSpeed = 1;

    this.angle = Math.random() * Math.PI * 2;
    this.swingSpeed = Math.random() * 0.03 + 0.01;
    this.swingAmount = Math.random() * 2 + 1;

    this.color = "#000000";
  }

  update() {
    this.y -= this.speedY;

    this.size += this.growthSpeed;

    this.angle += this.swingSpeed;

    this.x += Math.sin(this.angle) * this.swingAmount;
  }

  draw() {
    twoDi.beginPath();

      twoDi.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

    twoDi.fillStyle = this.color;
    twoDi.fill();
  }

  isDead() {

    return (
      this.y < -this.size ||
      this.x < -this.size ||
      this.x > canvas.width + this.size
    );

  }
}



function createParticles() {
  for (let i = 0; i < 2; i++) {
    particles.push(
        new Particle()
    );
  }
}



function animate() {
  twoDi.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
  
  requestAnimationFrame(animate);
}



animate();



setInterval(() => {

    createParticles();

}, 100);