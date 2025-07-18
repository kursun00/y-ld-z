// Gelişmiş Yağmur Efekti: normal damlalar + kalp ve yıldız damlaları

const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Drop {
  constructor(type = 'line') {
    this.type = type; // line, heart, star
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.l = Math.random() * 15 + 5;
    this.xs = (-0.2) + Math.random() * 0.4;  // Yatay hız yavaşlatıldı
    this.ys = Math.random() * 1.2 + 1.2;     // Dikey hız yavaşlatıldı
    this.size = Math.random() * 12 + 8;
    this.alpha = Math.random() * 0.5 + 0.5;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    if (this.type === 'line') {
      ctx.strokeStyle = 'rgba(174,194,224,0.5)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.xs, this.y + this.l);
      ctx.stroke();
    } else if (this.type === 'heart') {
      ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`;
      ctx.beginPath();
      let topCurveHeight = this.size * 0.3;
      ctx.moveTo(this.x, this.y + topCurveHeight);
      ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
      ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + (this.size + topCurveHeight) / 1.5, this.x, this.y + this.size);
      ctx.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight) / 1.5, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
      ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'star') {
      ctx.fillStyle = `rgba(255, 255, 224, ${this.alpha})`;
      ctx.beginPath();
      const spikes = 5;
      const outerRadius = this.size / 2;
      const innerRadius = outerRadius / 2.5;
      let rot = Math.PI / 2 * 3;
      let x = this.x;
      let y = this.y;
      let step = Math.PI / spikes;

      ctx.moveTo(x, y - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = this.x + Math.cos(rot) * outerRadius;
        y = this.y + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = this.x + Math.cos(rot) * innerRadius;
        y = this.y + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(this.x, this.y - outerRadius);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
  update() {
    this.x += this.xs;
    this.y += this.ys;
    if (this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = -20;
    }
    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.random() * canvas.width;
      this.y = -20;
    }
  }
}

const drops = [];

// 140 çizgi damla, 30 kalp, 30 yıldız
for (let i = 0; i < 140; i++) drops.push(new Drop('line'));
for (let i = 0; i < 30; i++) drops.push(new Drop('heart'));
for (let i = 0; i < 30; i++) drops.push(new Drop('star'));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const drop of drops) {
    drop.draw();
    drop.update();
  }
  requestAnimationFrame(animate);
}
animate();

// Müzik kontrol
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

musicBtn.addEventListener("click", () => {
  bgMusic.play();
});

// Mini oyunlar

// Sev Beni - tıklandıkça sevgi sayısı artar ve not gösterilir
let loveCount = 0;
function startLoveGame() {
  const note = document.getElementById("heart-note");
  loveCount++;
  note.textContent = `💖 Yağmur, ${loveCount} kere sevildin!`;
  note.classList.remove("hidden");
}

// Kaçan Kalp - peluş ayıcık görünür, tıklayınca kaybolur ve tebrik mesajı çıkar
function startCatchHeart() {
  const bear = document.getElementById("bear");
  bear.classList.remove("hidden");
  bear.onclick = () => {
    bear.classList.add("hidden");
    alert("Tebrikler! Peluş ayıcığı yakaladın.");
  };
}

// Doğru Butonu Bul - ilk tıklamada uyarı, ikinci tıklamada papatya çıkar
let buttonsClicked = 0;
function startFindButton() {
  const daisy = document.getElementById("daisy");
  if (buttonsClicked === 0) {
    alert("Doğru butona basmalısın!");
    buttonsClicked++;
  } else if (buttonsClicked === 1) {
    daisy.classList.remove("hidden");
    alert("Doğru butonu buldun! Papatya çıktı 🌼");
    buttonsClicked = 0;
  }
}

// Güzel sözler listesi
const words = [
  "Hayat, sevgiyle güzelleşir.",
  "Her gün yeni bir başlangıçtır.",
  "Gülümse, dünya seninle güzel.",
  "Küçük anlar büyük mutluluklar getirir.",
  "Yıldızlar kadar parlak ol!",
  "Sevgi paylaştıkça çoğalır.",
  "Rüyaların peşinden git!",
  "Mutluluk, anlarda gizlidir."
];

// Her 5 saniyede bir güzel söz değişsin
const wordText = document.getElementById("word-text");
setInterval(() => {
  const randomIndex = Math.floor(Math.random() * words.length);
  wordText.textContent = `"${words[randomIndex]}"`;
}, 5000);

// Kişisel mesaj paneli
const personalMsg = document.getElementById('personal-message');
const messageText = document.getElementById('message-text');

const messages = [
  "Yağmur, sen benim için çok özelsin. ❤️",
  "Her günüm seninle daha güzel.",
  "Sana her baktığımda gülümserim.",
  "Seninle her an bir macera.",
  "Kalbim sadece senin için atıyor.",
];

personalMsg.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  messageText.textContent = messages[randomIndex] + " (Tıklayarak mesajı değiştir)";
});
