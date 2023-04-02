const mobileMenuElement = document.getElementById('mobile-menu');
const backdrop = document.getElementById('backdrop');
const hamburgerBtn = document.getElementById('hamburger');


hamburgerBtn.addEventListener('click',mobileMenuToggle);
backdrop.addEventListener('click',toggleBackDrop);

function mobileMenuToggle (event) {
    backdrop.classList.toggle('hidden');
    mobileMenuElement.classList.toggle('hidden');
}


function toggleBackDrop(event) {

    backdrop.classList.add('hidden');
    mobileMenuElement.classList.add('hidden');
}






















