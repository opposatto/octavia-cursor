// Octavia Travel - Premium Mobile Web Application
// Scroll-driven animations and luxury experience

class OctaviaExperience {
    constructor() {
        this.currentSection = 0;
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.scrollThreshold = 50;
        this.mediaData = this.initializeMediaData();
        this.ambientAudio = document.getElementById('ambientAudio');
        this.epicAudio = document.getElementById('epicAudio');
        this.currentMediaSet = [];
        this.currentMediaIndex = 0;
        this.isMediaPlaying = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAudio();
        this.setupScrollObserver();
        this.setupMediaPlayer();
        this.createAudioVisualizer();
        this.animateOnLoad();
    }

    initializeMediaData() {
        return {
            'yacht-luxury': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/489629721_1224312743037246_1387263067139685184_n.jpg',
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/488247612_1218257000309487_634314993753419862_n.jpg',
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/467308518_18046340471488207_8857665241303816876_n.jpg'
            ],
            'yacht-medium': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/488248822_1221313206670533_2619314602182333357_n.jpg',
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/467654016_18046340633488207_525707459581305388_n.jpg'
            ],
            'yacht-small': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/467604767_18046340618488207_7080726273068802982_n.jpg',
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/467335827_18046340648488207_7908444182024984275_n.jpg',
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/492577301_1240136838121503_7953086626805307033_n.jpg'
            ],
            'jetski': [
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/494634917_1249237657211421_7381374683799088894_n.jpg',
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/491924489_1240584288076758_5089490372483173308_n.jpg'
            ],
            'waterpark': [
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/487505326_1221313613337159_2257670150634775544_n.jpg',
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/499928433_1263850209083499_8007283800379249658_n.jpg',
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/490238009_1227213116080542_5971018363675880019_n.jpg'
            ],
            'parasailing': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/499758586_1263848012417052_6448428652605359676_n.jpg',
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/487356079_1213270694141451_3714176188515191504_n.jpg'
            ],
            'resort-main': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/492067384_1241164261352094_2344252122183279432_n.jpg'
            ],
            'private-island': [
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/487502651_1218257006976153_5494540344985065537_n.jpg'
            ],
            'sunset-chill': [
                'https://z-p3-scontent.fpnh18-2.fna.fbcdn.net/v/t39.30808-6/491718702_1232658802202640_1925492791760057618_n.jpg'
            ],
            'buggy-tour': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/487505570_1218256680309519_4388090686172555704_n.jpg'
            ],
            'quad-tour': [
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/486513285_1213270814141439_566613281515582916_n.jpg'
            ],
            'jet-charter': [
                'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/492759344_1244558947679292_4367608314684127881_n.jpg',
                'https://z-p3-scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/493908519_1244689227666264_4732524610416889587_n.jpg'
            ]
        };
    }

    setupEventListeners() {
        // Touch and scroll events
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        document.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        
        // Navigation dots
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSection(index));
        });

        // Service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', this.handleServiceCardClick.bind(this));
        });

        // Media player controls
        document.getElementById('closePlayer').addEventListener('click', this.closeMediaPlayer.bind(this));
        document.getElementById('fullscreenToggle').addEventListener('click', this.toggleFullscreen.bind(this));
        document.getElementById('playPause').addEventListener('click', this.toggleMediaPlayback.bind(this));
        document.getElementById('prevMedia').addEventListener('click', this.previousMedia.bind(this));
        document.getElementById('nextMedia').addEventListener('click', this.nextMedia.bind(this));
        document.getElementById('volumeToggle').addEventListener('click', this.toggleVolume.bind(this));
        document.getElementById('volumeSlider').addEventListener('input', this.handleVolumeChange.bind(this));

        // Form and contact interactions
        document.querySelectorAll('.btn-social').forEach(btn => {
            btn.addEventListener('click', this.handleSocialShare.bind(this));
        });

        document.getElementById('sendQuestion').addEventListener('click', this.handleQuickQuestion.bind(this));

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));

        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupScrollObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionIndex = parseInt(entry.target.id.split('-')[1]);
                    this.updateCurrentSection(sectionIndex);
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.section').forEach(section => {
            this.observer.observe(section);
        });
    }

    initializeAudio() {
        // Initialize ambient audio with low volume
        this.ambientAudio.volume = 0.3;
        this.epicAudio.volume = 0.7;
        
        // Auto-play ambient audio (with user gesture requirement)
        document.addEventListener('click', () => {
            if (this.ambientAudio.paused) {
                this.ambientAudio.play().catch(() => {
                    console.log('Audio autoplay prevented by browser');
                });
            }
        }, { once: true });
    }

    createAudioVisualizer() {
        const visualizer = document.createElement('div');
        visualizer.className = 'audio-visualizer';
        visualizer.innerHTML = '<i class="fas fa-music"></i>';
        visualizer.addEventListener('click', this.toggleAmbientAudio.bind(this));
        document.body.appendChild(visualizer);
    }

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        if (this.isScrolling) return;
        
        this.touchEndY = e.changedTouches[0].clientY;
        const deltaY = this.touchStartY - this.touchEndY;
        
        if (Math.abs(deltaY) > this.scrollThreshold) {
            e.preventDefault();
            if (deltaY > 0 && this.currentSection < 5) {
                this.nextSection();
            } else if (deltaY < 0 && this.currentSection > 0) {
                this.previousSection();
            }
        }
    }

    handleWheel(e) {
        if (this.isScrolling) return;
        
        e.preventDefault();
        
        if (e.deltaY > 0 && this.currentSection < 5) {
            this.nextSection();
        } else if (e.deltaY < 0 && this.currentSection > 0) {
            this.previousSection();
        }
    }

    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                if (this.currentSection < 5) this.nextSection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (this.currentSection > 0) this.previousSection();
                break;
            case 'Escape':
                this.closeMediaPlayer();
                break;
            case 'ArrowLeft':
                if (document.getElementById('mediaPlayer').classList.contains('active')) {
                    this.previousMedia();
                }
                break;
            case 'ArrowRight':
                if (document.getElementById('mediaPlayer').classList.contains('active')) {
                    this.nextMedia();
                }
                break;
        }
    }

    nextSection() {
        if (this.currentSection < 5) {
            this.goToSection(this.currentSection + 1);
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.goToSection(this.currentSection - 1);
        }
    }

    goToSection(index) {
        if (this.isScrolling || index === this.currentSection) return;
        
        this.isScrolling = true;
        this.currentSection = index;
        
        const targetSection = document.getElementById(`section-${index}`);
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        this.updateNavigation();
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    updateCurrentSection(index) {
        this.currentSection = index;
        this.updateNavigation();
    }

    updateNavigation() {
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSection);
        });
    }

    triggerSectionAnimations(section) {
        const elements = section.querySelectorAll('.section-title, .about-item, .service-card, .event-type');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `slideUp 0.8s ease-out forwards`;
                element.style.opacity = '1';
            }, index * 150);
        });
    }

    animateOnLoad() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 300 + 500);
        });
    }

    handleServiceCardClick(e) {
        const card = e.currentTarget;
        const mediaKey = card.dataset.media;
        
        if (mediaKey && this.mediaData[mediaKey]) {
            this.openMediaPlayer(mediaKey);
        }
    }

    setupMediaPlayer() {
        const mediaPlayer = document.getElementById('mediaPlayer');
        
        // Handle tap navigation areas
        const mediaContainer = document.querySelector('.media-container');
        mediaContainer.addEventListener('click', (e) => {
            const rect = mediaContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const containerWidth = rect.width;
            
            if (clickX < containerWidth / 2) {
                this.previousMedia();
            } else {
                this.nextMedia();
            }
        });
    }

    openMediaPlayer(mediaKey) {
        this.currentMediaSet = this.mediaData[mediaKey];
        this.currentMediaIndex = 0;
        
        const mediaPlayer = document.getElementById('mediaPlayer');
        const mediaSlidesContainer = document.getElementById('mediaSlides');
        
        // Clear existing slides
        mediaSlidesContainer.innerHTML = '';
        
        // Create slides for each media item
        this.currentMediaSet.forEach((mediaUrl, index) => {
            const slide = document.createElement('div');
            slide.className = `media-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${mediaUrl}" alt="Media ${index + 1}">`;
            mediaSlidesContainer.appendChild(slide);
        });
        
        mediaPlayer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Switch to epic audio for media viewing
        this.ambientAudio.pause();
        this.epicAudio.play().catch(() => {
            console.log('Epic audio play prevented');
        });
        
        // Auto-play slideshow
        this.startMediaSlideshow();
    }

    closeMediaPlayer() {
        const mediaPlayer = document.getElementById('mediaPlayer');
        mediaPlayer.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop slideshow
        this.stopMediaSlideshow();
        
        // Switch back to ambient audio
        this.epicAudio.pause();
        this.ambientAudio.play().catch(() => {
            console.log('Ambient audio play prevented');
        });
    }

    startMediaSlideshow() {
        this.isMediaPlaying = true;
        this.updatePlayPauseButton();
        
        this.slideshowInterval = setInterval(() => {
            if (this.isMediaPlaying) {
                this.nextMedia();
            }
        }, 4000); // 4 seconds per slide
    }

    stopMediaSlideshow() {
        this.isMediaPlaying = false;
        this.updatePlayPauseButton();
        
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
        }
    }

    toggleMediaPlayback() {
        if (this.isMediaPlaying) {
            this.stopMediaSlideshow();
        } else {
            this.startMediaSlideshow();
        }
    }

    updatePlayPauseButton() {
        const playPauseBtn = document.getElementById('playPause');
        const icon = playPauseBtn.querySelector('i');
        
        if (this.isMediaPlaying) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    }

    nextMedia() {
        if (this.currentMediaSet.length <= 1) return;
        
        const currentSlide = document.querySelector('.media-slide.active');
        currentSlide.classList.remove('active');
        
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.currentMediaSet.length;
        
        const nextSlide = document.querySelectorAll('.media-slide')[this.currentMediaIndex];
        nextSlide.classList.add('active');
    }

    previousMedia() {
        if (this.currentMediaSet.length <= 1) return;
        
        const currentSlide = document.querySelector('.media-slide.active');
        currentSlide.classList.remove('active');
        
        this.currentMediaIndex = this.currentMediaIndex === 0 
            ? this.currentMediaSet.length - 1 
            : this.currentMediaIndex - 1;
        
        const prevSlide = document.querySelectorAll('.media-slide')[this.currentMediaIndex];
        prevSlide.classList.add('active');
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {
                console.log('Fullscreen request failed');
            });
        } else {
            document.exitFullscreen();
        }
    }

    toggleVolume() {
        const volumeBtn = document.getElementById('volumeToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        const icon = volumeBtn.querySelector('i');
        
        if (this.epicAudio.volume > 0) {
            this.epicAudio.volume = 0;
            volumeSlider.value = 0;
            icon.className = 'fas fa-volume-mute';
        } else {
            this.epicAudio.volume = 0.7;
            volumeSlider.value = 70;
            icon.className = 'fas fa-volume-up';
        }
    }

    handleVolumeChange(e) {
        const volume = e.target.value / 100;
        this.epicAudio.volume = volume;
        
        const volumeBtn = document.getElementById('volumeToggle');
        const icon = volumeBtn.querySelector('i');
        
        if (volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    toggleAmbientAudio() {
        const visualizer = document.querySelector('.audio-visualizer');
        const icon = visualizer.querySelector('i');
        
        if (this.ambientAudio.paused) {
            this.ambientAudio.play().catch(() => {
                console.log('Audio play prevented');
            });
            icon.className = 'fas fa-music';
            visualizer.style.animation = 'pulse 2s infinite';
        } else {
            this.ambientAudio.pause();
            icon.className = 'fas fa-volume-mute';
            visualizer.style.animation = 'none';
        }
    }

    handleSocialShare(e) {
        const platform = e.currentTarget.dataset.platform;
        const formTextarea = document.querySelector('.dream-form textarea');
        const message = formTextarea.value || 'I\'m interested in your exclusive travel experiences';
        
        const encodedMessage = encodeURIComponent(message);
        
        let url = '';
        switch(platform) {
            case 'telegram':
                url = `https://t.me/octaviatravel?text=${encodedMessage}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/1234567890?text=${encodedMessage}`;
                break;
            case 'email':
                url = `mailto:contact@octaviatravel.com?subject=Dream Experience Request&body=${encodedMessage}`;
                break;
        }
        
        if (url) {
            window.open(url, '_blank');
        }
    }

    handleQuickQuestion() {
        const questionInput = document.getElementById('quickQuestion');
        const question = questionInput.value.trim();
        
        if (question) {
            const encodedQuestion = encodeURIComponent(`Quick question: ${question}`);
            const whatsappUrl = `https://wa.me/1234567890?text=${encodedQuestion}`;
            window.open(whatsappUrl, '_blank');
            questionInput.value = '';
        }
    }

    handleResize() {
        // Recalculate positions and dimensions on resize
        if (window.innerWidth !== this.lastWidth) {
            this.lastWidth = window.innerWidth;
            // Force section alignment
            setTimeout(() => {
                this.goToSection(this.currentSection);
            }, 100);
        }
    }
}

// Enhanced scroll-driven animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.animatedElements = new Set();
        this.setupAnimationObserver();
    }

    setupAnimationObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.triggerAnimation(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Observe all animatable elements
        document.querySelectorAll('.about-item, .service-card, .event-type, .section-title').forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    triggerAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.setupImageLazyLoading();
        this.setupPrefetching();
    }

    setupImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupPrefetching() {
        // Prefetch important images on interaction
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('.service-card img')) {
                const mediaKey = e.target.closest('.service-card').dataset.media;
                this.prefetchMediaSet(mediaKey);
            }
        });
    }

    prefetchMediaSet(mediaKey) {
        const app = window.octaviaApp;
        if (app.mediaData[mediaKey]) {
            app.mediaData[mediaKey].forEach(url => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = url;
                document.head.appendChild(link);
            });
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.octaviaApp = new OctaviaExperience();
    new ScrollAnimations();
    new PerformanceOptimizer();
    
    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    });
}