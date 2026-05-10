const lines = [
  'Ayuu, you are my dream come true.',
  'Every day with you is a blessing.',
  'I want to spend forever with you.',
  'Will you make me the happiest person?',
  'I love you more than words can express.'
];

const typingText = document.getElementById('typingText');
const nextBtn = document.getElementById('nextBtn');
const pageWrap = document.getElementById('pageWrap');
const loaderScreen = document.getElementById('loaderScreen');
const introPopup = document.getElementById('introPopup');
const introOpenButton = document.getElementById('introOpenButton');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cursorGlow = document.getElementById('cursorGlow');
let currentLine = 0;
let currentChar = 0;
let isDeleting = false;
let secretClicks = 0;
let secretTimeout;

function typeLine() {
  const currentText = lines[currentLine];
  if (!isDeleting) {
    typingText.textContent = currentText.slice(0, currentChar + 1);
    currentChar++;
    if (currentChar === currentText.length) {
      isDeleting = true;
      setTimeout(typeLine, 2200);
      return;
    }
  } else {
    typingText.textContent = currentText.slice(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentLine = (currentLine + 1) % lines.length;
    }
  }
  const speed = isDeleting ? 50 : 90;
  setTimeout(typeLine, speed);
}

function smoothScrollToNext() {
  const nextSection = document.getElementById('love');
  nextSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToNext(button) {
  const currentSection = button.closest('.glass-section');
  const nextSection = currentSection.nextElementSibling;
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}

nextBtn.addEventListener('click', smoothScrollToNext);

function createHeartParticles() {
  const container = document.querySelector('.heart-particles');
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 90}%`;
    heart.style.animationDuration = `${10 + Math.random() * 12}s`;
    heart.style.opacity = `${0.15 + Math.random() * 0.25}`;
    heart.textContent = '💕';
    container.appendChild(heart);
  }
}

function showSecretMessage() {
  if (secretTimeout) {
    clearTimeout(secretTimeout);
  }
  secretClicks += 1;
  if (secretClicks >= 5) {
    alert('You are the one I want to spend my life with 💍');
    secretClicks = 0;
  }
  secretTimeout = setTimeout(() => { secretClicks = 0; }, 2200);
}

yesBtn.addEventListener('click', () => {
  alert('Yay! I love you so much! 💕');
});

noBtn.addEventListener('click', () => {
  alert('That\'s okay, I\'ll keep trying! 😊');
});

function initCursorGlow() {
  document.addEventListener('mousemove', event => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

function closeIntroPopup() {
  introPopup.classList.add('closing');
  pageWrap.classList.add('blurred');
  setTimeout(() => {
    introPopup.classList.add('hidden');
    introPopup.setAttribute('aria-hidden', 'true');
    pageWrap.classList.remove('blurred');
  }, 450);
}

introOpenButton.addEventListener('click', closeIntroPopup);

function init() {
  typeLine();
  createHeartParticles();
  initCursorGlow();
  setTimeout(() => {
    loaderScreen.style.opacity = '0';
    loaderScreen.style.pointerEvents = 'none';
    pageWrap.classList.add('visible');
  }, 1400);
}

window.addEventListener('load', init);
