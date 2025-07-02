// Octavia Travel - GSAP Scroll-Driven Animations
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class OctaviaApp {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 6;
        this.ambientAudio = document.getElementById('ambientAudio');
        this.audioControl = document.getElementById('audioControl');
        this.isAudioPlaying = false;
        
        this.init();
    }

    init() {
        this.setupAudio();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupYachtAnimations();
        this.setupEventListeners();
    }

    setupAudio() {
        // Set initial audio properties
        this.ambientAudio.volume = 0.3;
        this.ambientAudio.loop = true;

        // Audio control click handler
        this.audioControl.addEventListener('click', () => {
            this.toggleAudio();
        });

        // Auto-play on first user interaction
        document.addEventListener('click', () => {
            if (!this.isAudioPlaying) {
                this.playAudio();
            }
        }, { once: true });
    }

    toggleAudio() {
        if (this.isAudioPlaying) {
            this.pauseAudio();
        } else {
            this.playAudio();
        }
    }

    playAudio() {
        this.ambientAudio.play().then(() => {
            this.isAudioPlaying = true;
            this.audioControl.style.animation = 'pulse 2s infinite';
        }).catch((error) => {
            console.log('Audio play failed:', error);
        });
    }

    pauseAudio() {
        this.ambientAudio.pause();
        this.isAudioPlaying = false;
        this.audioControl.style.animation = 'none';
    }

    setupNavigation() {
        const dots = document.querySelectorAll('.dot');
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSection(index);
            });
        });

        // Update active dot based on scroll position
        ScrollTrigger.create({
            trigger: ".main-container",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const progress = self.progress;
                const sectionIndex = Math.round(progress * (this.totalSections - 1));
                this.updateActiveDot(sectionIndex);
            }
        });
    }

    updateActiveDot(index) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        this.currentSection = index;
    }

    goToSection(index) {
        const targetSection = document.querySelector(`[data-section="${index}"]`);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupScrollAnimations() {
        // Smooth scrolling with momentum
        gsap.to("body", {
            scrollBehavior: "smooth",
            duration: 0.1
        });

        // Section snap scrolling
        const sections = gsap.utils.toArray('.section');
        
        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => this.updateActiveDot(index),
                onEnterBack: () => this.updateActiveDot(index)
            });
        });
    }

    setupHeroAnimations() {
        const heroTimeline = gsap.timeline();

        // Initial hero content animation
        heroTimeline
            .from('.hero-logo', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            })
            .from('.hero-tagline', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5")
            .from('.hero-description', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4")
            .from('.scroll-indicator', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3");

        // Parallax effect for hero video
        gsap.to('.hero-video', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Hero content parallax
        gsap.to('.hero-content', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    setupYachtAnimations() {
        // Section header animation
        gsap.from('.yacht-section .section-header', {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: ".yacht-section",
                start: "top 70%",
                end: "top 30%",
                scrub: 1
            }
        });

        // Cards staggered animation
        gsap.from('.yacht-section .service-card', {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".cards-container",
                start: "top 80%",
                end: "top 40%",
                scrub: 1
            }
        });

        // Floating elements parallax
        gsap.to('.float-1', {
            y: -30,
            x: 20,
            rotation: 180,
            ease: "none",
            scrollTrigger: {
                trigger: ".yacht-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.float-2', {
            y: -40,
            x: -15,
            rotation: -180,
            ease: "none",
            scrollTrigger: {
                trigger: ".yacht-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.float-3', {
            y: -35,
            x: 25,
            rotation: 90,
            ease: "none",
            scrollTrigger: {
                trigger: ".yacht-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Cards hover parallax effect
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            const cardBg = card.querySelector('.card-bg img');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(cardBg, {
                    scale: 1.1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(cardBg, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            // Scroll-driven card animation
            ScrollTrigger.create({
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(card, {
                        y: -progress * 20,
                        rotationY: progress * 5,
                        duration: 0.1,
                        overwrite: true
                    });
                }
            });
        });
    }

    setupEventListeners() {
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    if (this.currentSection < this.totalSections - 1) {
                        this.goToSection(this.currentSection + 1);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.currentSection > 0) {
                        this.goToSection(this.currentSection - 1);
                    }
                    break;
            }
        });

        // Handle touch gestures for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const deltaY = touchStartY - touchEndY;

            if (Math.abs(deltaY) > swipeThreshold) {
                if (deltaY > 0 && this.currentSection < this.totalSections - 1) {
                    // Swipe up - next section
                    this.goToSection(this.currentSection + 1);
                } else if (deltaY < 0 && this.currentSection > 0) {
                    // Swipe down - previous section
                    this.goToSection(this.currentSection - 1);
                }
            }
        };

        this.handleSwipe = handleSwipe;

        // Handle resize
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        // Service card interactions
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                // Add click animation
                gsap.to(card, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });

                // Future: Open media player
                console.log('Card clicked:', card.dataset.media);
            });
        });
    }

    // Utility method for smooth section transitions
    animateSection(section, direction = 'in') {
        const elements = section.querySelectorAll('.section-title, .section-subtitle, .service-card');
        
        if (direction === 'in') {
            gsap.from(elements, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        } else {
            gsap.to(elements, {
                opacity: 0,
                y: -30,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.in"
            });
        }
    }
}

// Advanced scroll-driven animations
class ScrollEffects {
    constructor() {
        this.setupAdvancedEffects();
    }

    setupAdvancedEffects() {
        // Background gradient shift based on scroll
        ScrollTrigger.create({
            trigger: ".main-container",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const progress = self.progress;
                document.body.style.filter = `hue-rotate(${progress * 60}deg)`;
            }
        });

        // Mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            gsap.to('.floating-elements', {
                x: (mouseX - 0.5) * 20,
                y: (mouseY - 0.5) * 20,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        // Scroll speed indicator
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
            
            // Adjust blur based on scroll speed
            const blurAmount = Math.min(scrollSpeed * 0.1, 2);
            gsap.to('.hero-video', {
                filter: `blur(${blurAmount}px)`,
                duration: 0.1
            });

            lastScrollY = currentScrollY;
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        window.octaviaApp = new OctaviaApp();
        new ScrollEffects();
        
        // Add loading complete class
        document.body.classList.add('loaded');
        
        console.log('🚢 Octavia Travel App Initialized');
        console.log('✨ GSAP ScrollTrigger Ready');
    } else {
        console.error('GSAP or ScrollTrigger not loaded');
    }
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 229, 92, 0.6); }
        100% { transform: scale(1); }
    }
    
    .loaded .hero-logo {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .hero-tagline {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .hero-description {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded .scroll-indicator {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
`;
document.head.appendChild(style);