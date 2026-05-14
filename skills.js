/* ========================================
   SKILLS & EXPERIENCE - MODULAR JAVASCRIPT
   ======================================== */

// Initialize Skills & Experience functionality
document.addEventListener('DOMContentLoaded', () => {
    initSkillChipAnimations();
    initExperienceCardAnimations();
});

/**
 * Add hover and interaction effects to skill chips
 */
function initSkillChipAnimations() {
    const skillChips = document.querySelectorAll('.skill-chip');

    skillChips.forEach((chip, index) => {
        // Stagger entrance animation
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(20px)';

        setTimeout(() => {
            chip.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            chip.style.opacity = '1';
            chip.style.transform = 'translateY(0)';
        }, 100 * index);

        // Enhanced particle burst effect on click
        chip.addEventListener('click', function (e) {
            // Create particle burst
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '100';

                const rect = this.getBoundingClientRect();
                particle.style.left = (e.clientX - rect.left) + 'px';
                particle.style.top = (e.clientY - rect.top) + 'px';

                const angle = (Math.PI * 2 * i) / 8;
                const velocity = 80;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;

                particle.style.animation = `particle-burst 0.8s ease-out forwards`;
                particle.style.setProperty('--vx', vx + 'px');
                particle.style.setProperty('--vy', vy + 'px');

                this.appendChild(particle);
                setTimeout(() => particle.remove(), 800);
            }

            // Ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
                z-index: 50;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add animations
    if (!document.getElementById('skill-animations')) {
        const style = document.createElement('style');
        style.id = 'skill-animations';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
            @keyframes particle-burst {
                to {
                    transform: translate(var(--vx), var(--vy));
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Add scroll-triggered animations to experience cards
 */
function initExperienceCardAnimations() {
    const experienceCards = document.querySelectorAll('.experience-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Smooth scroll for back-to-top link
 */
document.querySelectorAll('.back-to-top a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
