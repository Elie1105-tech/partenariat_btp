// SYSTÈME DE FILTRES
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Activer le bouton cliqué
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filtrer les projets
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'tous' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
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

// Initialiser les transitions pour les cartes
projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// CARROUSEL OPTIMISÉ
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;
const totalSlides = slides.length;
let isTransitioning = false;
let autoplayTimer;

// Créer les indicateurs
slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

// Fonction pour mettre à jour le carrousel
function updateCarousel(instant = false) {
    if (isTransitioning && !instant) return;
    
    isTransitioning = true;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });

    if (!instant) {
        setTimeout(() => {
            isTransitioning = false;
        }, 700);
    } else {
        isTransitioning = false;
    }
}

// Aller à un slide spécifique
function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    currentIndex = index;
    updateCarousel();
    resetAutoplay();
}

// Slide suivant
function nextSlide() {
    if (isTransitioning) return;
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
    resetAutoplay();
}

// Slide précédent
function prevSlide() {
    if (isTransitioning) return;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoplay();
}

// Événements des boutons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Support clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Support tactile (swipe)
let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
}

// Autoplay
function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 7000);
}

function stopAutoplay() {
    clearInterval(autoplayTimer);
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// Pause au survol
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);

// Démarrer l'autoplay
startAutoplay();

// Initialisation
updateCarousel(true);