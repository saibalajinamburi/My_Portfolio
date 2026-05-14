/* ========================================
   CONTACT SECTION INTERACTIVITY
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.getElementById('contact');
    const contactContent = document.querySelector('.contact-content') || document.querySelector('.contact-container');

    if (contactSection && contactContent) {
        // Simple intersection observer for fade-in effect
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactContent.style.opacity = '1';
                    contactContent.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Set initial state
        contactContent.style.opacity = '0';
        contactContent.style.transform = 'translateY(30px)';
        contactContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        observer.observe(contactSection);
    }

    // Handle contact method clicks with visual feedback
    const contactMethods = document.querySelectorAll('.contact-method');

    contactMethods.forEach(method => {
        method.addEventListener('click', function () {
            // Add visual feedback
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 150);
            }
        });
    });

    // Enhance primary CTA button interaction
    const primaryCTA = document.querySelector('.contact-primary-cta');
    if (primaryCTA) {
        primaryCTA.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        primaryCTA.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    }
});
