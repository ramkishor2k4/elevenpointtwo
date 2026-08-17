/* ==========================================================================
   ELEVEN POINT TWO - EVENT & CONCERT PRODUCTION AGENCY INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initMobileNav();
  initScrollProgressBar();
  initScrollReveals();
  initThree3DScene();
  initHeroParticles();
  initStatsCounter();
  initArtistCarousel();
  initGlassSpotlight();
  initModals();
  initAudioVisualizerCanvas();
  initFormSubmission();
  initHeroTilt();
  initCategoryTabs();
  initSoundWidget();
  initFloatingMusicNotes();
  initTicketModal();
});

/* Floating Unicode Musical Notes Generator on Scroll */
function initFloatingMusicNotes() {
  const symbols = ['♪', '♫', '♬', '♩', '♭', '♮', '🎼'];
  const colors = ['#38bdf8', '#c084fc', '#fbbf24', '#34d399', '#f472b6'];
  let lastScrollY = window.scrollY;
  let throttleTimer = false;

  window.addEventListener('scroll', () => {
    if (throttleTimer) return;
    throttleTimer = true;

    setTimeout(() => {
      throttleTimer = false;
    }, 120);

    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) > 25) {
      lastScrollY = currentScrollY;
      createMusicNote();
    }
  });

  function createMusicNote() {
    const note = document.createElement('div');
    note.className = 'floating-note';
    note.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    const randomX = Math.random() * (window.innerWidth - 60) + 30;
    const randomY = Math.min(window.innerHeight - 80, Math.max(100, Math.random() * window.innerHeight));
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    note.style.left = `${randomX}px`;
    note.style.top = `${randomY}px`;
    note.style.color = randomColor;
    note.style.textShadow = `0 0 15px ${randomColor}`;

    document.body.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, 3800);
  }
}

/* Ticket Booking Modal Logic */
function initTicketModal() {
  const ticketModal = document.getElementById('ticketModal');
  const openTicketBtns = document.querySelectorAll('.js-open-ticket-modal');
  const form = document.getElementById('ticketBookingForm');

  if (!ticketModal) return;

  openTicketBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      ticketModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>Processing Ticket Request...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span style="color: #34d399;">✓ Ticket Reservation Confirmed!</span>';
        setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          ticketModal.classList.remove('active');
          document.body.style.overflow = '';
        }, 1800);
      }, 1200);
    });
  }
}


/* Cinematic Three.js 3D Scene Engine */
function initThree3DScene() {
  const container = document.getElementById('threeHeroContainer');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 50);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x0284c7, 2, 50);
  pointLight2.position.set(-5, -5, 2);
  scene.add(pointLight2);

  // Floating 3D Sound Core (TorusKnot Mesh)
  const coreGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x07090e,
    emissive: 0x0284c7,
    specular: 0x38bdf8,
    shininess: 100,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const soundCore = new THREE.Mesh(coreGeo, coreMat);
  scene.add(soundCore);

  // Outer Glowing Wireframe Sphere
  const outerGeo = new THREE.IcosahedronGeometry(2.2, 2);
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const outerSphere = new THREE.Mesh(outerGeo, outerMat);
  scene.add(outerSphere);

  // Floating Sound Wave Ring Particles
  const waveParticleCount = 180;
  const waveGeo = new THREE.BufferGeometry();
  const wavePositions = new Float32Array(waveParticleCount * 3);

  for (let i = 0; i < waveParticleCount; i++) {
    const angle = (i / waveParticleCount) * Math.PI * 2;
    const radius = 3.2 + Math.sin(i * 0.5) * 0.3;
    wavePositions[i * 3] = Math.cos(angle) * radius;
    wavePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
    wavePositions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
  const waveMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.08,
    transparent: true,
    opacity: 0.7
  });
  const waveRing = new THREE.Points(waveGeo, waveMat);
  scene.add(waveRing);

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Scroll Reaction Interaction
  let targetScrollY = 0;
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  });

  // Mouse Reactivity
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotations
    soundCore.rotation.x = elapsedTime * 0.3 + targetScrollY * 0.001;
    soundCore.rotation.y = elapsedTime * 0.4 + targetScrollY * 0.002;

    outerSphere.rotation.x = -elapsedTime * 0.15;
    outerSphere.rotation.y = elapsedTime * 0.2;

    waveRing.rotation.y = elapsedTime * 0.25;

    // React to Scroll Position (camera depth & core scale)
    const scrollFactor = Math.min(targetScrollY / 800, 1);
    camera.position.z = 7 + scrollFactor * 3;
    soundCore.scale.setScalar(1 + scrollFactor * 0.4);

    // Subtle Mouse Tilt
    camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();
}

/* Category Filter Tabs for Signature Productions */
function initCategoryTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.production-card');
  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* Web Audio Synthesizer Sound Controller Widget */
function initSoundWidget() {
  const widget = document.getElementById('soundWidget');
  if (!widget) return;

  let audioCtx = null;
  let isPlaying = false;
  let osc1, osc2, gainNode;

  widget.addEventListener('click', () => {
    if (!isPlaying) {
      // Start Ambient Synthesizer Sound
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      osc1 = audioCtx.createOscillator();
      osc2 = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, audioCtx.currentTime); // E3 note

      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 1);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();

      isPlaying = true;
      widget.classList.add('playing');
    } else {
      // Stop Ambient Sound
      if (gainNode) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          osc1?.stop();
          osc2?.stop();
          osc1?.disconnect();
          osc2?.disconnect();
        }, 500);
      }
      isPlaying = false;
      widget.classList.remove('playing');
    }
  });
}


/* Scroll Progress Bar */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

/* Scroll Triggered Section Reveals */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* Hero Ambient Particles Canvas */
function initHeroParticles() {
  const canvas = document.getElementById('heroParticleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4 - 0.2,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
    });

    animationId = requestAnimationFrame(draw);
  }
  draw();
}

/* Interactive Hero Content 3D Tilt */
function initHeroTilt() {
  const heroCard = document.querySelector('.hero-content');
  if (!heroCard) return;

  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    heroCard.style.transform = `perspective(1000px) rotateX(${-y * 0.015}deg) rotateY(${x * 0.015}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    heroCard.style.transition = 'transform 0.5s ease';
  });

  heroCard.addEventListener('mouseenter', () => {
    heroCard.style.transition = 'none';
  });
}


/* Custom Fluid Follower Cursor */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('customCursorFollower');

  if (!cursor || !follower) return;

  if ('ontouchstart' in window || window.matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.classList.add('cursor-active');

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover triggers for interactive elements
  const hoverElements = document.querySelectorAll('a, button, .artist-card, .production-card, .service-card, .gallery-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.classList.add('is-hover');
      if (el.dataset.cursor === 'video') {
        follower.classList.add('is-video');
      }
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('is-hover', 'is-video');
    });
  });
}

/* Mobile Navigation Drawer Toggle */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('mobile-active');
    toggleBtn.classList.toggle('active', isOpen);
    if (header) header.classList.toggle('nav-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-active');
      toggleBtn.classList.remove('active');
      if (header) header.classList.remove('nav-open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('mobile-active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('mobile-active');
      toggleBtn.classList.remove('active');
      if (header) header.classList.remove('nav-open');
      document.body.style.overflow = '';
    }
  });
}

/* Header Shrink on Scroll */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Animated Stats Counter on Scroll */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.dataset.target, 10);
          const suffix = num.dataset.suffix || '';
          let count = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              num.innerText = target + suffix;
              clearInterval(timer);
            } else {
              num.innerText = count + suffix;
            }
          }, 16);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* Artist Showcase Horizontal Carousel */
function initArtistCarousel() {
  const track = document.getElementById('artistsTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track) return;

  const cards = track.querySelectorAll('.artist-card');
  if (!cards.length) return;

  let currentIndex = 0;
  const getVisibleCards = () => {
    if (window.innerWidth <= 600) return 2;
    if (window.innerWidth <= 900) return 3;
    if (window.innerWidth <= 1200) return 4;
    return 6;
  };

  const totalPages = Math.ceil(cards.length / getVisibleCards());

  // Create Dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => scrollToPage(i));
    dotsContainer.appendChild(dot);
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 24; // card width + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    const pageIndex = Math.min(Math.floor(currentIndex / getVisibleCards()), totalPages - 1);
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === pageIndex);
    });
  }

  function scrollToPage(pageIndex) {
    currentIndex = pageIndex * getVisibleCards();
    const maxIndex = cards.length - getVisibleCards();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateCarousel();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIndex = cards.length - getVisibleCards();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = cards.length - getVisibleCards();
      }
      updateCarousel();
    });
  }

  window.addEventListener('resize', updateCarousel);
}

/* Glassmorphism Card Radial Spotlight Effect */
function initGlassSpotlight() {
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* Modal Open / Close Logic */
function initModals() {
  const planModal = document.getElementById('planEventModal');
  const showreelModal = document.getElementById('showreelModal');
  const ticketModal = document.getElementById('ticketModal');

  const openPlanBtns = document.querySelectorAll('.js-open-plan-modal');
  const openShowreelBtns = document.querySelectorAll('.js-open-showreel-modal');
  const openTicketBtns = document.querySelectorAll('.js-open-ticket-modal');
  const closeBtns = document.querySelectorAll('.modal-close');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  openPlanBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      planModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  openShowreelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showreelModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  openTicketBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      ticketModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* Audio Visualizer Canvas for Showreel */
function initAudioVisualizerCanvas() {
  const canvas = document.getElementById('visualizerCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 360;
  }
  resize();
  window.addEventListener('resize', resize);

  const numBars = 64;
  const bars = Array.from({ length: numBars }, () => Math.random());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / numBars) - 4;
    const centerY = canvas.height / 2;

    bars.forEach((val, i) => {
      // Animate bar height randomly
      const targetVal = Math.sin(Date.now() * 0.005 + i * 0.2) * 0.5 + 0.5;
      const height = targetVal * (canvas.height * 0.4) + 10;

      const x = i * (barWidth + 4);
      const y = centerY - height / 2;

      // Gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + height);
      gradient.addColorStop(0, '#38bdf8');
      gradient.addColorStop(1, '#0284c7');

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
      ctx.fillRect(x, y, barWidth, height);
    });

    animationId = requestAnimationFrame(draw);
  }
  draw();
}

/* Form Submission Simulation */
function initFormSubmission() {
  const form = document.getElementById('eventInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>Sending Request...</span>';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span style="color: #38bdf8;">✓ Inquiry Sent Successfully!</span>';
      setTimeout(() => {
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        document.getElementById('planEventModal').classList.remove('active');
        document.body.style.overflow = '';
      }, 1800);
    }, 1200);
  });
}
