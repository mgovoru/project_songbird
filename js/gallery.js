import { aydioPlayerRun } from './player.js';
import birdsData from './birds.js';
//галерея
let birdPrev = document.querySelector('.gallery__prev');
let birdNext = document.querySelector('.gallery__next');
let audioGallery = new Audio();
const galleryName = document.querySelector('.gallery__name');
const galleryKind = document.querySelector('.gallery__kind');
const galleryText = document.querySelector('.gallery__text');
const galleryImg = document.querySelector('.gallery__img');
let birdKind = 0;
let birdFromKind = 0;
const navMenu = Array.from(document.querySelectorAll('.menu__item'));

navMenu.forEach((item, index) => {
	item.addEventListener('click', () => {
		clearClass();
		birdKind = index;
		item.classList.add('active');
		galleryFill(birdKind, 0);
	})
})
function clearClass() {
	navMenu.forEach((item, index) => {
		item.classList.remove('active');
	})
}

galleryFill(0, 0);

function galleryFill(j, i) {
	galleryName.innerHTML = `${birdsData[j][i].name}`;
	galleryKind.innerHTML = `${birdsData[j][i].species}`;
	galleryText.innerHTML = `${birdsData[j][i].description}`;
	galleryImg.src = `${birdsData[j][i].image}`;
	aydioPlayerRun(".gallery__player", audioGallery, j, i);
}

birdNext.addEventListener("click",
	() => {
		console.log('клик');
		birdFromKind++;
		if (birdFromKind > 5) { birdFromKind = 0 }
		galleryFill(birdKind, birdFromKind);
	})

birdPrev.addEventListener("click",
	() => {
		console.log('клик');
		birdFromKind--;
		if (birdFromKind < 0) { birdFromKind = 5 }
		galleryFill(birdKind, birdFromKind);
	})