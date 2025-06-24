document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Photo gallery shuffle functionality
    window.shufflePhotos = function() {
        const gallery = document.querySelector('.photo-gallery');
        const photos = Array.from(gallery.children);
        
        // Add animation class
        gallery.style.opacity = '0.5';
        gallery.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Shuffle array
            for (let i = photos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [photos[i], photos[j]] = [photos[j], photos[i]];
            }
            
            // Clear gallery and re-append shuffled photos
            gallery.innerHTML = '';
            photos.forEach(photo => gallery.appendChild(photo));
            
            // Remove animation
            gallery.style.opacity = '1';
            gallery.style.transform = 'scale(1)';
        }, 300);
    };

    // Add hover effects to photo items
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to shuffle button
    const shuffleBtn = document.querySelector('.shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-item, .photo-item, .letter-paper');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add sparkle effect to birthday photo
    const birthdayPhoto = document.querySelector('.birthday-photo');
    if (birthdayPhoto) {
        birthdayPhoto.addEventListener('click', function() {
            createSparkles(this);
        });
    }

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '';
            sparkle.style.position = 'fixed';
            sparkle.style.left = rect.left + rect.width/2 + 'px';
            sparkle.style.top = rect.top + rect.height/2 + 'px';
            sparkle.style.fontSize = '20px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = `sparkleFloat 1s ease-out forwards`;
            sparkle.style.animationDelay = i * 0.1 + 's';
            
            document.body.appendChild(sparkle);
            
            // Random direction
            const angle = (360 / sparkleCount) * i;
            const distance = 50 + Math.random() * 30;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;
            
            sparkle.style.setProperty('--x', x + 'px');
            sparkle.style.setProperty('--y', y + 'px');
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }

    // Add CSS for sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                transform: translate(0, 0) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(var(--x), var(--y)) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add typing effect to the main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add birthday confetti effect
    function createConfetti() {
        const colors = ['#ff6b9d', '#ffd93d', '#667eea', '#6bcf7f'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Add confetti animation CSS
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Trigger confetti on page load
    setTimeout(createConfetti, 1000);
    
    // Add confetti on photo click
    if (birthdayPhoto) {
        birthdayPhoto.addEventListener('click', createConfetti);
    }
});