// Loading Screen - hide as fast as possible once everything is loaded
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    // Minimal delay - page is already loaded at this point
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 300);
    }, 150);
});