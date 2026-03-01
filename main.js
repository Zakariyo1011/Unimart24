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




// PROMOTIONS SLIDER (Multi-section support)


{
  // 1. Sahifadagi barcha slider konteynerlarini topamiz
  const sliderSections = document.querySelectorAll('.promotions__container');

  sliderSections.forEach((container) => {
    // 2. Har bir section ichidan o'ziga tegishli elementlarni qidiramiz
    const promotionsGrid = container.querySelector('.promotions__grid');
    const prevBtn = container.querySelector('.promotions-arrow--left');
    const nextBtn = container.querySelector('.promotions-arrow--right');
    const promoDots = container.querySelectorAll('.promo-dot');
    const items = promotionsGrid.querySelectorAll('.promo-card');

    if (promotionsGrid && prevBtn && nextBtn) {
      let currentIndex = 0;

      function getVisibleCount() {
        return window.innerWidth <= 768 ? 1 : 4;
      }

      function getTotalSlides() {
        // Agar kartalar soni ko'rinadiganidan kam bo'lsa, 0 qaytaramiz
        const count = items.length - getVisibleCount() + 1;
        return count > 0 ? count : 1;
      }

      function goToSlide(index) {
        const totalSlides = getTotalSlides();

        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        currentIndex = index;

        // Gap (masofa) ni aniqlaymiz (20px deb olingan)
        const itemWidth = items[0].offsetWidth + 20; 
        promotionsGrid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Nuqtalarni (dots) faqat shu section ichida yangilaymiz
        promoDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });

        // Tugmalar shaffofligini boshqarish
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentIndex >= totalSlides - 1 ? '0.3' : '1';
      }

      // Hodisalarni biriktirish
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

      promoDots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
      });

      window.addEventListener('resize', () => goToSlide(0));

      // Swipe (Mobil uchun)
      let touchStartX = 0;
      promotionsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      promotionsGrid.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
      }, { passive: true });

      // Boshlang'ich holat
      goToSlide(0);
    }
  });
}






//////////////Offers/////






document.addEventListener('DOMContentLoaded', function () {
  const isMobile = () => window.innerWidth <= 768;

  // 1. Category dropdown (Barcha menyular uchun)
  const allSideMenus = document.querySelectorAll('.side-menu'); // Asosiy konteynerni olamiz

  allSideMenus.forEach(menu => {
    const menuHeader = menu.querySelector('.side-menu__header');
    const menuList = menu.querySelector('.side-menu__list');

    if (menuHeader && menuList) {
      menuHeader.addEventListener('click', () => {
        if (!isMobile()) return;
        const open = menuList.classList.toggle('open');
        menuHeader.classList.toggle('open', open);
      });

      menuList.querySelectorAll('.side-menu__item').forEach(item => {
        item.addEventListener('click', function () {
          menuList.querySelectorAll('.side-menu__item').forEach(i => i.classList.remove('side-menu__item--active'));
          this.classList.add('side-menu__item--active');
          
          const headerSpan = menuHeader.querySelector('span');
          if (headerSpan) headerSpan.textContent = this.textContent;

          if (isMobile()) {
            menuList.classList.remove('open');
            menuHeader.classList.remove('open');
          }
        });
      });
    }
  });

  // 2. Slider (Barcha slider sectionlar uchun)
  const allOfferSections = document.querySelectorAll('.offers'); // Har bir sectionni alohida olamiz

  allOfferSections.forEach(section => {
    const track = section.querySelector('.offers__slides-track');
    const prevBtn = section.querySelector('.offers__nav--prev');
    const nextBtn = section.querySelector('.offers__nav--next');
    const dots = section.querySelectorAll('.pagination .dot');
    const cards = section.querySelectorAll('.p-card');
    
    if (!track || cards.length === 0) return; // Agar bu sectionda slider bo'lmasa, o'tib ketamiz

    let current = 0;
    const total = cards.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      
      if (isMobile()) {
        track.style.transform = `translateX(-${current * 100}%)`;
      } else {
        track.style.transform = '';
      }
      
      dots.forEach((dot, i) => dot.classList.toggle('dot--active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Swipe (Har bir slider uchun alohida)
    let startX = 0;
    track.addEventListener('touchstart', e => { 
      startX = e.changedTouches[0].screenX; 
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    // Window resize bo'lganda faqat shu sliderni yangilash
    window.addEventListener('resize', () => goTo(current));
    
    // Boshlang'ich holat
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




document.addEventListener('DOMContentLoaded', () => {
    // 1. Accordion (Savol-javob)
    const faqRows = document.querySelectorAll('.faq-row');

    faqRows.forEach(row => {
        row.addEventListener('click', () => {
            const wrapper = row.parentElement;
            
            // Boshqa ochiq savollarni yopish (ixtiyoriy)
            document.querySelectorAll('.faq-row-wrapper').forEach(item => {
                if (item !== wrapper) item.classList.remove('open');
            });

            // Tanlangan savolni ochish/yopish
            wrapper.classList.toggle('open');
            row.classList.toggle('active');
        });
    });

    // 2. Galereya surish (Gallery Next btn)
    const gallery = document.querySelector('.gallery-images');
    const nextBtn = document.querySelector('.gallery-next-btn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
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

    


































































// ... (Sizning barcha kodlaringiz shu yerda)

/**
 * ============================================================
 * PROJECT JAVASCRIPT DOCUMENTATION & NOTES
 * ============================================================
 * * 1. MOBILE INTERFACE (NAV & SEARCH):
 * - 'mobileSearchBtn' va 'mobileSearchBar' o'rtasida toggle mantiqi o'rnatilgan.
 * - Mobil menyu (Burger menu) 'open' va 'close' funksiyalari orqali boshqariladi.
 * - Menyu ochilganda 'body' skroll bo'lmasligi uchun 'overflow: hidden' qilingan.
 * - Window 'resize' bo'lib 768px dan oshganda barcha mobil elementlar avtomatik yopiladi.
 * * 2. SLIDER LOGIC (CATALOG & PROMOTIONS):
 * - Ko'p blokli slider tizimi (Multi-section support) qo'llanilgan.
 * - 'getVisibleCount' funksiyasi ekran kengligiga qarab 1 yoki 4 ta element ko'rsatishni aniqlaydi.
 * - 'goToSlide' funksiyasi:
 * * 'translateX' yordamida elementlarni suradi.
 * * Navigatsiya nuqtalarini (dots) 'active' klassi bilan yangilaydi.
 * * Slider boshi va oxirida tugmalarning 'opacity' (shaffofligi) ni o'zgartiradi.
 * - Mobil qurilmalar uchun 'touchstart' va 'touchend' orqali Swipe (surish) imkoniyati qo'shilgan.
 * * 3. OFFERS & CATEGORY DROPDOWN:
 * - 'allSideMenus' har bir dropdown menyuni alohida mustaqil boshqaradi.
 * - Mobil versiyada kategoriya tanlanganda dropdown avtomatik yopiladi va sarlavha matni o'zgaradi.
 * - 'allOfferSections' har bir slider blokini (track) o'zaro to'qnashuvsiz (independent) ishlatadi.
 * * 4. DOCUMENT VIEWER (INFORMATION):
 * - Thumbnail (kichik rasm) bosilganda asosiy rasm ('mainImg') manbasi 'src' orqali almashadi.
 * - 'currentIndex' yordamida Prev/Next strelkalari cheksiz sikl (Modulo % operatori) orqali ishlaydi.
 * * 5. FAQ & REVIEWS (ACCORDION & INTERACTIVE):
 * - Accordion: Bir savol ochilganda boshqalari yopilish mantiqi 'faq-row'da mavjud.
 * - Progress Bar: Sahifa yuklanganda 'setTimeout' orqali 0 dan berilgan foizgacha animatsiya bo'ladi.
 * - Gallery Scroll: 'scrollBy' funksiyasi yordamida rasmlar gorizontal tekislikda (smooth) suriladi.
 * * 6. EXPERT REVIEWS:
 * - 'Read More' tugmasi bosilganda CSS'dagi cheklovlar ('webkitLineClamp') olib tashlanib, to'liq matn ochiladi.
 * - Rasm galereyasi aniq piksellar (226px) bo'yicha hisoblab suriladi.
 * * ============================================================
 * TIP: Kodni yanada optimallashtirish uchun takrorlanadigan slider 
 * funksiyalarini bitta umumiy Class yoki Function'ga jamlash mumkin.
 * ============================================================
 */