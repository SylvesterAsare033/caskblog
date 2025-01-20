const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const interval = 3000;

let currentSlide = 0;

function showSlide() {
    slides[currentSlide].classList.add('active');
}

function hideSlide() {
    slides[currentSlide].classList.remove('active');
}

function nextSlide() {
    hideSlide();
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide();
}

function prevSlide() {
    hideSlide();
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide();
}

showSlide();

setInterval(nextSlide, interval);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});