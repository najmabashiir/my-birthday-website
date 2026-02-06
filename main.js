import confetti from 'canvas-confetti';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
});

// Confetti Button Logic
const confettiBtn = document.getElementById('confetti-btn');

if (confettiBtn) {
  confettiBtn.addEventListener('click', () => {
    fireConfetti();
  });
}

function fireConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// Typewriter Effect
const text = "Happy Birthday\nNajma Bashiir Ali!";
const typeWriterElement = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
  if (i < text.length) {
    if (text.charAt(i) === '\n') {
      typeWriterElement.innerHTML += '<br>';
    } else {
      typeWriterElement.innerHTML += text.charAt(i);
    }
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing on load
window.addEventListener('load', () => {
  fireConfetti();
  typeWriter();
});


// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function () {
    lightbox.style.display = "block";
    lightboxImg.src = this.src;
    // captionText.innerHTML = this.alt; // Removed caption as requested
  });
});

// Interactive Wish Form
const addWishBtn = document.getElementById('add-wish-btn');
const wishInput = document.getElementById('wish-input');
const wishesList = document.getElementById('wishes-list');

if (addWishBtn) {
  addWishBtn.addEventListener('click', () => {
    const message = wishInput.value.trim();
    if (message) {
      const newWish = document.createElement('div');
      newWish.classList.add('wish-card');
      newWish.innerHTML = `
                <p>"${message}"</p>
                <p class="sender">- A Friend</p>
            `;
      wishesList.insertBefore(newWish, wishesList.firstChild);
      wishInput.value = '';

      // Pop confetti on wishing
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Send to WhatsApp
      const phoneNumber = "252617614325";
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    } else {
      alert("Please write a sweet message first! 💖");
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = "none";
  });
}

// Close lightbox when clicking outside the image
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}
