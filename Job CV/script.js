/* --- PDF / Print Download --- */
function downloadPDF() {
    window.print();
}

/* --- Animate progress bars on load --- */
document.addEventListener('DOMContentLoaded', function () {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach(function (bar, index) {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'none';

        // Force reflow so the 0% width takes effect
        bar.offsetHeight;

        setTimeout(function () {
            bar.style.transition = 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            bar.style.width = targetWidth;
        }, 400 + (index * 150));
    });
});
