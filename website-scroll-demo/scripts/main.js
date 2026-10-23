// ========================================
// 山东财经大学东方学院 - 交互脚本 v2
// ========================================

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  var navbar = document.getElementById('navbar');
  var scrollThreshold = 80;

  function handleNavScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > scrollThreshold) {
      navbar.classList.remove('transparent');
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
      navbar.classList.add('transparent');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile menu toggle ---
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    var menuLinks = navMenu.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    }
  }

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.navbar-menu a');

  function updateActiveNav() {
    var scrollPos = (window.scrollY || window.pageYOffset) + 120;
    for (var i = sections.length - 1; i >= 0; i--) {
      var section = sections[i];
      if (section.offsetTop <= scrollPos) {
        var targetId = section.getAttribute('id');
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove('active');
          if (navLinks[j].getAttribute('href') === '#' + targetId) {
            navLinks[j].classList.add('active');
          }
        }
        break;
      }
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- Hero banner auto-carousel ---
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroNavDots = document.querySelectorAll('.hero-nav-dot');
  var heroPrev = document.getElementById('heroPrev');
  var heroNext = document.getElementById('heroNext');
  var currentSlide = 0;
  var totalSlides = heroSlides.length;
  var autoPlayInterval = 5000;
  var autoPlayTimer = null;
  var isTransitioning = false;

  function goToSlide(index) {
    if (!totalSlides || isTransitioning || index === currentSlide) return;
    isTransitioning = true;

    // Remove active from current
    heroSlides[currentSlide].classList.remove('active');
    heroNavDots[currentSlide].classList.remove('active');

    // Set new index
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    // Add active to new
    heroSlides[currentSlide].classList.add('active');
    heroNavDots[currentSlide].classList.remove('active');
    // Force reflow for animation restart
    void heroNavDots[currentSlide].offsetWidth;
    heroNavDots[currentSlide].classList.add('active');

    setTimeout(function () {
      isTransitioning = false;
    }, 1200);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    if (!totalSlides) return;
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // Dot navigation
  for (var i = 0; i < heroNavDots.length; i++) {
    heroNavDots[i].addEventListener('click', function () {
      var index = parseInt(this.getAttribute('data-index'), 10);
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  }

  // Arrow navigation
  if (heroPrev) {
    heroPrev.addEventListener('click', function () {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  if (heroNext) {
    heroNext.addEventListener('click', function () {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  // Start auto-play
  startAutoPlay();

  // Pause on hover
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  // --- Smooth scroll for anchor links ---
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var k = 0; k < anchorLinks.length; k++) {
    anchorLinks[k].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var navHeight = navbar.offsetHeight;
          var targetPos = targetEl.offsetTop - navHeight;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }
    });
  }

})();
