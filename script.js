// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Prevent expensive layout/shadow transitions during theme switch
    document.body.classList.add('theme-switching');
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
    
    // Remove the class after the color transition finishes
    setTimeout(() => {
        document.body.classList.remove('theme-switching');
    }, 400);
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const roles = ['AI Systems Engineer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

type();

// Optimized Magnetic Effect with requestAnimationFrame
const magneticElements = document.querySelectorAll('.magnetic');
let magneticAnimationFrame = null;
let currentMagneticTarget = null;
let targetX = 0;
let targetY = 0;

function updateMagneticPosition() {
    if (currentMagneticTarget) {
        currentMagneticTarget.style.transform = `translate(${targetX}px, ${targetY}px)`;
    }
    magneticAnimationFrame = null;
}

magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        targetX = x * 0.3;
        targetY = y * 0.3;
        currentMagneticTarget = element;

        if (!magneticAnimationFrame) {
            magneticAnimationFrame = requestAnimationFrame(updateMagneticPosition);
        }
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
        currentMagneticTarget = null;
        if (magneticAnimationFrame) {
            cancelAnimationFrame(magneticAnimationFrame);
            magneticAnimationFrame = null;
        }
    });
});

// Optimized 3D Tilt Effect with requestAnimationFrame
const imageWrapper = document.querySelector('.image-wrapper');
let tiltAnimationFrame = null;
let tiltX = 0;
let tiltY = 0;

function updateTilt() {
    imageWrapper.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1.05, 1.05, 1.05)`;
    tiltAnimationFrame = null;
}

if (imageWrapper) {
    imageWrapper.addEventListener('mousemove', (e) => {
        const rect = imageWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        tiltX = ((x / rect.width) - 0.5) * 20;
        tiltY = ((y / rect.height) - 0.5) * -20;

        if (!tiltAnimationFrame) {
            tiltAnimationFrame = requestAnimationFrame(updateTilt);
        }
    });

    imageWrapper.addEventListener('mouseleave', () => {
        imageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        if (tiltAnimationFrame) {
            cancelAnimationFrame(tiltAnimationFrame);
            tiltAnimationFrame = null;
        }
    });
}

// Floating Particles (Reduced to 8 for performance)
const particlesContainer = document.querySelector('.particles');
const particleCount = 8;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 2}px;
        height: ${Math.random() * 3 + 2}px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.7), rgba(79, 70, 229, 0.3));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 15 + 20}s ease-in-out infinite;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.4 + 0.2};
        will-change: transform;
        transform: translate3d(0, 0, 0);
    `;
    particlesContainer.appendChild(particle);
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        33% { transform: translate3d(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px, 0) scale(1.1); }
        66% { transform: translate3d(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px, 0) scale(0.9); }
    }
`;
document.head.appendChild(style);

// Optimized Gradient Mesh with GPU Transform
const gradientMesh = document.querySelector('.gradient-mesh');
let meshAnimationFrame = null;

function updateGradientMesh(x, y) {
    if (!meshAnimationFrame && gradientMesh) {
        meshAnimationFrame = requestAnimationFrame(() => {
            // Translate the oversized gradient mesh (which starts at -50% -50%)
            // so its center perfectly aligns with the mouse.
            const moveX = x - (window.innerWidth / 2);
            const moveY = y - (window.innerHeight / 2);
            
            gradientMesh.style.transform = `translate(${moveX}px, ${moveY}px)`;
            meshAnimationFrame = null;
        });
    }
}

document.addEventListener('mousemove', (e) => {
    if (gradientMesh && !gradientMesh.classList.contains('active')) {
        gradientMesh.classList.add('active');
    }
    updateGradientMesh(e.clientX, e.clientY);
}, { passive: true });

// Noise canvas removed for performance (was iterating 2M+ pixels every 150ms at only 3% opacity)




// Geometric shapes removed for performance (were invisible at 5-15% opacity)


// Active Link Highlighting with Throttled Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

let scrollAnimationFrame = null;

function updateActiveLink() {
    let current = 'home';

    // Get viewport middle for better detection
    const scrollPosition = window.scrollY + (window.innerHeight / 3);

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    scrollAnimationFrame = null;
}

window.addEventListener('scroll', () => {
    if (!scrollAnimationFrame) {
        scrollAnimationFrame = requestAnimationFrame(updateActiveLink);
    }
}, { passive: true });

// CTA Button Ripple Effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function (e) {
        this.classList.add('ripple');
        setTimeout(() => {
            this.classList.remove('ripple');
        }, 600);
    });
}
// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Pause animations when not visible (Performance boost)
if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.particle, .geometric-shapes div');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, {
        rootMargin: '100px' // Start animation a bit before it's visible
    });

    animatedElements.forEach(el => observer.observe(el));
}
// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========================================
// CURSOR SPOTLIGHT (Dark Mode)
// ========================================
(function() {
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    // GPU layer — no layout triggers
    spotlight.style.willChange = 'transform';
    spotlight.style.left = '0px';
    spotlight.style.top = '0px';
    document.body.appendChild(spotlight);

    let mouseX = 0, mouseY = 0;
    let spotX = 0, spotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateSpotlight() {
        spotX += (mouseX - spotX) * 0.06;
        spotY += (mouseY - spotY) * 0.06;
        // Center the 900x900px spotlight exactly on the cursor
        spotlight.style.transform = `translate(${spotX - 450}px, ${spotY - 450}px)`;
        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
})();

// Dark mode floating particles removed for performance


// ========================================
// SCROLL REVEAL OBSERVER (Robust)
// ========================================
(function() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger');
    if (!revealElements.length) return;

    // Step 1: Add sr-init class to mark elements for animation
    revealElements.forEach(el => el.classList.add('sr-init'));

    // Step 2: Set up observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '50px 0px 0px 0px'
    });

    // Step 3: Wait for loading screen to finish, then observe
    setTimeout(() => {
        revealElements.forEach(el => {
            // Force-reveal elements already in viewport
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                el.classList.add('revealed');
            } else {
                observer.observe(el);
            }
        });
    }, 100);
})();

// ========================================
// 3D TILT EFFECT ON CARDS
// ========================================
(function() {
    const tiltCards = document.querySelectorAll('.snapshot-card, .solution-card, .note-card');

    tiltCards.forEach(card => {
        let tiltRaf = null;
        card.addEventListener('mousemove', (e) => {
            if (!tiltRaf) {
                tiltRaf = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -4;
                    const rotateY = ((x - centerX) / centerX) * 4;

                    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                    tiltRaf = null;
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
})();

// ========================================
// SECTION GLOW DIVIDERS
// ========================================
(function() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, i) => {
        if (i < sections.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'glow-divider';
            section.parentNode.insertBefore(divider, section.nextSibling);
        }
    });
})();

// ========================================
// TYPED TEXT COUNTER FOR STATS
// ========================================
(function() {
    const counters = document.querySelectorAll('.metric-value');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const num = parseInt(text);
                if (isNaN(num)) return;

                let current = 0;
                const step = Math.ceil(num / 40);
                const suffix = text.replace(/[\d]/g, '');

                const interval = setInterval(() => {
                    current += step;
                    if (current >= num) {
                        current = num;
                        clearInterval(interval);
                    }
                    el.textContent = current + suffix;
                }, 30);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();

// ========================================
// SINGLE OPTIMIZED SCROLL HANDLER (60fps)
// Combines: active nav, progress bar, dynamic title
// ========================================
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const baseName = 'Namburi Saibalaji | AI Engineer';
    const sectionEmojis = {
        'home': '🏠', 'about': '👤', 'projects': '🚀',
        'experience': '💼', 'education': '🎓', 'contact': '📬'
    };

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const scrollPos = scrollY + 120;

            // Progress bar
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = ((scrollY / docHeight) * 100) + '%';

            // Back to top button visibility
            if (backToTopBtn) {
                backToTopBtn.classList.toggle('show', scrollY > 300);
            }

            // Active nav + dynamic title
            let currentSection = 'home';
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    currentSection = id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });

            const emoji = sectionEmojis[currentSection] || '';
            document.title = emoji ? `${emoji} ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} — ${baseName}` : baseName;

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ========================================
// SMOOTH NAV CLICKS WITH OFFSET
// ========================================
(function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPos = target.offsetTop - navHeight - 10;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ========================================
// HOVER RIPPLE ON CTA BUTTONS
// ========================================
(function() {
    const buttons = document.querySelectorAll('.cta-button, .download-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(255,255,255,0.2) 0%, transparent 60%);
                pointer-events: none;
                border-radius: inherit;
                animation: ripple-fade 0.6s ease forwards;
            `;
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `@keyframes ripple-fade { 0% { opacity: 1; transform: scale(0.8); } 100% { opacity: 0; transform: scale(1.5); } }`;
    document.head.appendChild(style);
})();

// ========================================
// CURSOR TRAIL (desktop only, 3 dots)
// ========================================
(function() {
    if (window.innerWidth < 768) return; // skip on mobile

    const trailCount = 3;
    const trails = [];

    for (let i = 0; i < trailCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.opacity = (1 - i / trailCount) * 0.5;
        dot.style.width = (5 - i) + 'px';
        dot.style.height = (5 - i) + 'px';
        // Position once at origin; use transform from now on
        dot.style.left = '0px';
        dot.style.top = '0px';
        dot.style.willChange = 'transform';
        document.body.appendChild(dot);
        trails.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animate() {
        let prevX = mouseX, prevY = mouseY;
        trails.forEach((trail, i) => {
            const speed = 0.35 - (i * 0.05);
            trail.x += (prevX - trail.x) * speed;
            trail.y += (prevY - trail.y) * speed;
            // transform:translate — GPU composited, zero layout cost
            trail.el.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
            prevX = trail.x;
            prevY = trail.y;
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

// (Glow dividers already injected above at section-divider block)

// ========================================
// PULSATING SNAPSHOT ICONS
// ========================================
(function() {
    const icons = document.querySelectorAll('.snapshot-icon i');
    icons.forEach((icon, i) => {
        icon.style.animation = `icon-pulse 2s ease-in-out infinite`;
        icon.style.animationDelay = (i * 0.3) + 's';
    });

    const s = document.createElement('style');
    s.textContent = `
        @keyframes icon-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(245,158,11,0.5)); }
        }
    `;
    document.head.appendChild(s);
})();

// ========================================
// FEATURED BADGE ON TOP PROJECT CARDS
// ========================================
(function() {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length < 1) return;

    const badges = ['⭐ Featured', '🔥 Latest'];
    projectCards.forEach((card, i) => {
        if (i > 1) return;
        const badge = document.createElement('div');
        badge.textContent = badges[i];
        badge.style.cssText = `
            position: absolute;
            top: 12px;
            right: 12px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #000;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 20px;
            z-index: 5;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(245,158,11,0.3);
            animation: badge-float 3s ease-in-out infinite;
        `;
        card.style.position = 'relative';
        card.appendChild(badge);
    });

    const s = document.createElement('style');
    s.textContent = `@keyframes badge-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`;
    document.head.appendChild(s);
})();

// ========================================
// AUTO-HIDE NAVBAR ON SCROLL DOWN
// ========================================
(function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    }, { passive: true });
})();

// ========================================
// TYPEWRITER EFFECT ON HERO SUBTITLE
// ========================================
(function() {
    const subtitle = document.querySelector('.typing-wrapper h2');
    if (!subtitle) return;

    const fullText = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary-color)';
    subtitle.style.animation = 'none';

    // Add blink animation for cursor
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        @keyframes blink-cursor { 0%,100%{border-color:var(--primary-color)} 50%{border-color:transparent} }
    `;
    document.head.appendChild(cursorStyle);
    subtitle.style.animation = 'blink-cursor 0.8s step-end infinite';

    let i = 0;
    function type() {
        if (i < fullText.length) {
            subtitle.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, 40 + Math.random() * 30);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
                subtitle.style.animation = '';
            }, 2000);
        }
    }

    // Start typing after loading screen finishes
    setTimeout(type, 2500);
})();

// ========================================
// TEXT SCRAMBLE ON SECTION HEADERS
// ========================================
(function() {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const headers = document.querySelectorAll('.section-header h2');

    function scramble(el) {
        const original = el.getAttribute('data-text') || el.textContent;
        if (!el.getAttribute('data-text')) el.setAttribute('data-text', original);

        let iteration = 0;
        const interval = setInterval(() => {
            el.textContent = original.split('').map((char, idx) => {
                if (idx < iteration) return original[idx];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            if (iteration >= original.length) clearInterval(interval);
            iteration += 1;
        }, 30);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scramble(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    headers.forEach(h => observer.observe(h));
})();

// Animated blobs dynamically injected removed for performance (already hardcoded in HTML)

// Inner card glow removed for performance (was causing mousemove overhead on cards)

// ========================================
// MAGNETIC BUTTONS
// ========================================
(function() {
    const magnetics = document.querySelectorAll('.cta-button, .cta-secondary, .download-btn');

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s ease';
        });
    });
})();