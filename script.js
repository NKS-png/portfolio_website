document.addEventListener("DOMContentLoaded", function () {
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                observer.unobserve(iframe);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.1
    });

    lazyIframes.forEach(iframe => observer.observe(iframe));
});

// Slider Functionality (Only 2 slides: Artwork and Animation)
let currentSlide = 0;
const totalSlides = 2; // Only Artwork and Animation
let isTransitioning = false;

function initSlider() {
    updateSlider();
    loadCurrentSlideContent();
}

function goToSlide(slideIndex) {
    if (isTransitioning || slideIndex < 0 || slideIndex >= totalSlides) return;
    
    isTransitioning = true;
    currentSlide = slideIndex;
    
    updateSlider();
    updateDots();
    loadCurrentSlideContent();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
}

function updateSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.style.transform = `translateY(-${currentSlide * 100}vh)`;
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function loadCurrentSlideContent() {
    // Load iframes for the current slide
    const currentSlideElement = document.querySelectorAll('.slider-slide')[currentSlide];
    if (currentSlideElement) {
        const iframes = currentSlideElement.querySelectorAll('iframe[data-src]');
        iframes.forEach(iframe => {
            if (!iframe.src || iframe.src === 'about:blank') {
                iframe.src = iframe.dataset.src;
            }
        });
    }
}

// Keyboard Navigation (Only for slider section)
document.addEventListener('keydown', function(e) {
    // Only activate when portfolio slider is visible
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
        const rect = portfolioSlider.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                prevSlide();
            } else if (e.key >= '1' && e.key <= '2') {
                e.preventDefault();
                goToSlide(parseInt(e.key) - 1);
            }
        }
    }
});

// Touch/Swipe Support (Only for slider section)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
        const rect = portfolioSlider.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            touchStartY = e.changedTouches[0].screenY;
        }
    }
});

document.addEventListener('touchend', function(e) {
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
        const rect = portfolioSlider.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - next slide
            nextSlide();
        } else {
            // Swipe down - previous slide
            prevSlide();
        }
    }
}

// Mouse Wheel Navigation (Only for slider section)
let wheelTimeout;
document.addEventListener('wheel', function(e) {
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
        const rect = portfolioSlider.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            e.preventDefault();
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }, 50);
        }
    }
}, { passive: false });

// Scroll to section function for hero buttons
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Advanced Scroll Animation for Gallery Items
function animateGalleryOnScroll() {
    document.querySelectorAll('.gallery iframe').forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => el.classList.add('show'), idx * 60);
        }
    });
}

// Mobile tap pop-out effect for gallery iframes
function enableMobilePopout() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    
    document.querySelectorAll('.gallery iframe').forEach(iframe => {
        iframe.addEventListener('touchstart', function(e) {
            document.querySelectorAll('.gallery iframe').forEach(el => el.classList.remove('popout'));
            this.classList.add('popout');
            setTimeout(() => {
                this.classList.remove('popout');
            }, 1200);
        });
    });
}

// Progressive lazy loading for gallery iframes
function progressiveLazyLoadIframes() {
    const iframes = Array.from(document.querySelectorAll('iframe[data-src]'));
    if (iframes.length === 0) return;

    // Load the first few iframes immediately
    iframes.slice(0, 3).forEach(iframe => {
        if (!iframe.src || iframe.src === 'about:blank') {
            iframe.src = iframe.dataset.src;
        }
    });
}

// Initialize everything
window.addEventListener('DOMContentLoaded', function() {
    initSlider();
    enableMobilePopout();
    progressiveLazyLoadIframes();
    animateGalleryOnScroll();
});

// Add scroll event listener for gallery animations
window.addEventListener('scroll', animateGalleryOnScroll);

// Navigation functions for home page buttons
function scrollToArtwork() {
    goToSlide(0);
}

function scrollToAnimation() {
    goToSlide(1);
}
