/////////
// Mobile search toggle

const mobileSearchBtn = document.getElementById('mobileSearchBtn');
const mobileSearchBar = document.getElementById('mobileSearchBar');

if (mobileSearchBtn && mobileSearchBar) {
    mobileSearchBtn.addEventListener('click', () => {
        mobileSearchBar.classList.toggle('open');
    });
}


// Mobile menu

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (mobileSearchBar) mobileSearchBar.classList.remove('open');
        if (mobileMenu) mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
});


// "Свяжитесь с нами" dropdown

const callbackDropdown = document.querySelector('.callback-dropdown');

if (callbackDropdown) {
    const menu = callbackDropdown.querySelector('.callback-dropdown__menu');
    const caret = callbackDropdown.querySelector('.fa-caret-down');

    callbackDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
        if (caret) caret.style.transform = menu.classList.contains('open') ? 'rotate(180deg)' : '';
    });

    document.addEventListener('click', () => {
        menu.classList.remove('open');
        if (caret) caret.style.transform = '';
    });
}


// Hero Slider — dots pagination

const slides = document.querySelectorAll('.hero__slide');
const dots = document.querySelectorAll('.hero__dots .dot');

function goToSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
    });
});













/////////////////Catalog tovarov///////









// CATALOG SLIDER



{
  const catalogGrid = document.querySelector('.catalog__grid');
  const prevBtn = document.querySelector('.slider-arrow--left');
  const nextBtn = document.querySelector('.slider-arrow--right');
  const pDots = document.querySelectorAll('.p-dot');

  if (catalogGrid && prevBtn && nextBtn) {
    const items = catalogGrid.querySelectorAll('.catalog__item');
    let currentIndex = 0;

    function getVisibleCount() {
      return window.innerWidth <= 768 ? 1 : 4;
    }

    function getTotalSlides() {
      return items.length - getVisibleCount() + 1;
    }

    function goToSlide(index) {
      const totalSlides = getTotalSlides();

      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;

      currentIndex = index;

      const itemWidth = items[0].offsetWidth + 20; // gap: 20px
      catalogGrid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      pDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
      nextBtn.style.opacity = currentIndex >= totalSlides - 1 ? '0.3' : '1';
    }

    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    pDots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    window.addEventListener('resize', () => goToSlide(0));

    // Swipe
    let touchStartX = 0;

    catalogGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    catalogGrid.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });

    goToSlide(0);
  }
}








//////////////Aksiya//////////





// PROMOTIONS SLIDER




{
  const sliderSections = document.querySelectorAll('.promotions__container');

  sliderSections.forEach((container) => {
    const grid      = container.querySelector('.promotions__grid');
    const prevBtn   = container.querySelector('.promotions-arrow--left');
    const nextBtn   = container.querySelector('.promotions-arrow--right');
    const dots      = container.querySelectorAll('.promo-dot');
    const items     = grid ? grid.querySelectorAll('.promo-card') : [];

    if (!grid || !items.length) return;

    let currentIndex = 0;

    // Nechta card bir vaqtda ko'rinadi
    function getVisibleCount() {
      if (window.innerWidth <= 768)  return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    }

    // Jami nechta "qadam" bor
    function getTotalSteps() {
      return Math.max(1, items.length - getVisibleCount() + 1);
    }

    function goToSlide(index) {
      const total = getTotalSteps();
      currentIndex = Math.min(Math.max(index, 0), total - 1);

      // Birinchi cardning kengligi + gap (20px)
      const itemWidth = items[0].offsetWidth + 20;
      grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      // Dotlarni yangilash
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      // Strelkalar opacity
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
      if (nextBtn) nextBtn.style.opacity = currentIndex >= total - 1 ? '0.3' : '1';
    }

    // Strelkalar
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Dotlar
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Resize da qayta hisoblash
    window.addEventListener('resize', () => goToSlide(0));

    // Swipe (mobile)
    let touchStartX = 0;
    grid.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    grid.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });

    // Boshlang'ich holat
    goToSlide(0);
  });
}






//////////////Offers/////






document.addEventListener('DOMContentLoaded', function () {
  var isMobile = function () { return window.innerWidth <= 768; };


  // 1. Category dropdown (side-menu)
  
  var allSideMenus = document.querySelectorAll('.side-menu');

  allSideMenus.forEach(function (menu) {
    var menuHeader = menu.querySelector('.side-menu__header');
    var menuList   = menu.querySelector('.side-menu__list');

    if (!menuHeader || !menuList) return;

    menuHeader.addEventListener('click', function () {
      if (!isMobile()) return;
      var open = menuList.classList.toggle('open');
      menuHeader.classList.toggle('open', open);
    });

    menuList.querySelectorAll('.side-menu__item').forEach(function (item) {
      item.addEventListener('click', function () {
        menuList.querySelectorAll('.side-menu__item').forEach(function (i) {
          i.classList.remove('side-menu__item--active');
        });
        this.classList.add('side-menu__item--active');

        var headerSpan = menuHeader.querySelector('span');
        if (headerSpan) headerSpan.textContent = this.textContent;

        if (isMobile()) {
          menuList.classList.remove('open');
          menuHeader.classList.remove('open');
        }
      });
    });
  });


  // 2. Offers Slider

  var allOfferSections = document.querySelectorAll('.offers');

  allOfferSections.forEach(function (section) {
    var track   = section.querySelector('.offers__slides-track');
    var prevBtn = section.querySelector('.offers__nav--prev');
    var nextBtn = section.querySelector('.offers__nav--next');
    var dots    = section.querySelectorAll('.pagination .dot');
    var cards   = section.querySelectorAll('.p-card');

    if (!track || cards.length === 0) return;

    var current = 0;
    var mobilePrev = null;
    var mobileNext = null;

    // Mobile uchun strelkalarni yaratish va active cardning rasmi ichiga qo'yish
    function createMobileNavs() {
      mobilePrev = document.createElement('button');
      mobilePrev.className = 'mobile-nav-prev';
      mobilePrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

      mobileNext = document.createElement('button');
      mobileNext.className = 'mobile-nav-next';
      mobileNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

      mobilePrev.addEventListener('click', function () { goTo(current - 1); });
      mobileNext.addEventListener('click', function () { goTo(current + 1); });

      // Birinchi cardga qo'yamiz
      var firstImg = cards[0].querySelector('.p-card__img');
      if (firstImg) {
        firstImg.appendChild(mobilePrev);
        firstImg.appendChild(mobileNext);
      }
    }

    function removeMobileNavs() {
      if (mobilePrev) { mobilePrev.remove(); mobilePrev = null; }
      if (mobileNext) { mobileNext.remove(); mobileNext = null; }
    }

    function moveMobileNavsToCard(index) {
      if (!mobilePrev || !mobileNext) return;
      var img = cards[index] ? cards[index].querySelector('.p-card__img') : null;
      if (img) {
        img.appendChild(mobilePrev);
        img.appendChild(mobileNext);
      }
    }

    function getVisibleCount() {
      return isMobile() ? 1 : 3;
    }

    function getTotalSteps() {
      return Math.max(1, cards.length - getVisibleCount() + 1);
    }

    function goTo(index) {
      var total = getTotalSteps();
      current = Math.min(Math.max(index, 0), total - 1);

      if (isMobile()) {
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        moveMobileNavsToCard(current);

        if (mobilePrev) mobilePrev.style.opacity = current === 0 ? '0.4' : '1';
        if (mobileNext) mobileNext.style.opacity = current >= total - 1 ? '0.4' : '1';
      } else {
        var cardWidth = cards[0].offsetWidth + 1;
        track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';

        if (prevBtn) prevBtn.style.opacity = current === 0 ? '0.4' : '1';
        if (nextBtn) nextBtn.style.opacity = current >= total - 1 ? '0.4' : '1';
      }

      dots.forEach(function (dot, i) {
        dot.classList.toggle('dot--active', i === current);
      });
    }

    // Desktop strelkalar
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    // Dotlar
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    // Swipe
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });

    // Resize
    window.addEventListener('resize', function () {
      if (isMobile()) {
        if (!mobilePrev) createMobileNavs();
      } else {
        removeMobileNavs();
      }
      goTo(0);
    });

    // Init
    if (isMobile()) {
      createMobileNavs();
    }
    goTo(0);
  });

});









/////////Information////////




document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.querySelector('.document-viewer__image img');
    const thumbnails = document.querySelectorAll('.thumb-item');
    const prevBtn = document.querySelector('.arrow--prev');
    const nextBtn = document.querySelector('.arrow--next');

    let currentIndex = 0;

    // Rasmni yangilash funksiyasi
    function updateImage(index) {
        // Hamma thumbnail-lardan active klassini olib tashlash
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Yangi tanlangan rasm manbasini olish
        const newSrc = thumbnails[index].querySelector('img').getAttribute('src');
        mainImg.setAttribute('src', newSrc);
        
        // Tanlangan thumbnail-ga active klassini qo'shish
        thumbnails[index].classList.add('active');
        currentIndex = index;
    }

    // Thumbnail-larga click hodisasi
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateImage(index);
        });
    });

    // Strelkalar (Prev/Next)
    nextBtn.addEventListener('click', () => {
        let index = (currentIndex + 1) % thumbnails.length;
        updateImage(index);
    });

    prevBtn.addEventListener('click', () => {
        let index = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateImage(index);
    });
});










/////////////Questions/////




document.addEventListener('DOMContentLoaded', function () {

    // 1. Accordion (Savol-javob)
    var faqRows = document.querySelectorAll('.faq-row');

    faqRows.forEach(function (row) {
        row.addEventListener('click', function () {
            var wrapper = row.parentElement;
            var isOpen = wrapper.classList.contains('open');

            // Barcha ochiq savollarni yopish 
            document.querySelectorAll('.faq-row-wrapper').forEach(function (item) {
                item.classList.remove('open');
                item.querySelector('.faq-row').classList.remove('active');
            });

            // Agar bosilgan yopiq bo'lsa — ochish
            if (!isOpen) {
                wrapper.classList.add('open');
                row.classList.add('active');
            }
        });
    });

    // 2. Galereya surish
    var gallery = document.querySelector('.gallery-images');
    var nextBtn = document.querySelector('.gallery-next-btn');

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            gallery.scrollBy({ left: 220, behavior: 'smooth' });
        });
    }

});






///////////////Reviewes////////////




document.addEventListener('DOMContentLoaded', () => {
    // 1. Progress bar animatsiyasi
    const bars = document.querySelectorAll('.reviews__bar-fill');
    
    // Sahifa yuklanganda barlarni sekin to'ldirish
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 300);
    });

    // 2. Galereya surish (Next tugmasi)
    const nextBtn = document.querySelector('.reviews__gallery-next');
    const gallery = document.querySelector('.reviews__gallery-images');

    if (nextBtn && gallery) {
        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({
                left: 220, // Bir rasm kengligi + gap
                behavior: 'smooth'
            });
        });
    }

    // 3. Rasmga bosganda "Zoom" effekti (shunchaki konsolga chiqaradi yoki alert beradi)
    const galleryImages = document.querySelectorAll('.reviews__img-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // Bu yerga Modal (Lightbox) oynasini ochish kodingizni qo'shishingiz mumkin
            console.log("Rasm kattalashtirildi: " + img.src);
        });
    });
});






//////////////EkspertPart2/////////////


document.addEventListener('DOMContentLoaded', () => {
    // 1. Read More funksiyasi
    const readMoreBtn = document.querySelector('.review-card__read-more');
    const textSections = document.querySelectorAll('.review-card__text-group p');

    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            textSections.forEach(p => {
                p.style.webkitLineClamp = 'unset'; // Agar CSS'da cheklov bo'lsa
                p.style.display = 'block';
            });
            readMoreBtn.style.display = 'none'; // Tugmani yashirish
        });
    }

    
        });
    

        // Review Card ichidagi galereya surish (Next tugmasi)
const reviewNextBtn = document.querySelector('.review-card__photo-next');
const reviewGallery = document.querySelector('.review-card__photos');

if (reviewNextBtn && reviewGallery) {
    reviewNextBtn.addEventListener('click', () => {
        // 226px = 206px (rasm kengligi) + 20px (gap/masofa)
        reviewGallery.scrollBy({
            left: 226, 
            behavior: 'smooth'
        });
    });
}















////////Chat


document.addEventListener('DOMContentLoaded', function () {

  var widget      = document.getElementById('chatWidget');
  var toggle      = document.getElementById('chatToggle');
  var overlay     = document.getElementById('chatModalOverlay');
  var openFormBtn = document.getElementById('openFormBtn');
  var closeModal  = document.getElementById('closeModal');

  // Toggle widget open / close
  toggle.addEventListener('click', function () {
    widget.classList.toggle('is-open');
  });

  // Open modal form
  openFormBtn.addEventListener('click', function () {
    overlay.classList.add('is-open');
    widget.classList.remove('is-open');
  });

  // Close modal by X button
  closeModal.addEventListener('click', function () {
    overlay.classList.remove('is-open');
  });

  // Close modal by clicking outside (overlay background)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('is-open');
    }
  });

  // Close widget when clicking outside of it
  document.addEventListener('click', function (e) {
    if (!widget.contains(e.target)) {
      widget.classList.remove('is-open');
    }
  });

});












    



















































































