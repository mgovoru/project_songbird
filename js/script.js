import birdsData from './birds.js';
import { aydioPlayerRun } from './player.js';
//заполняем варианты ответов
let questionGroup = 0;
let randomBird;
let steps = 0;
let selectBird = document.querySelectorAll('.choice__input');
let score = 0;
let audio = new Audio();
let audioQuestion = new Audio();

//звуки правильных и неправильных ответов
const audioSelect = new Audio();
audioSelect.src = `./assets/1.mp3`;
audioSelect.load();
const audioFalseSelect = new Audio();
audioFalseSelect.src = `./assets/2.mp3`;
audioFalseSelect.load();

function musicSelect() {
	audioSelect.currentTime = 0;
	audioSelect.play();
}
function musicFalseSelect() {
	audioFalseSelect.currentTime = 0;
	audioFalseSelect.play();
}



function choiceBird(j) {
	const labels = document.querySelectorAll('.choice__label');
	for (let i = 0; i < labels.length; i++) {
		labels[i].innerHTML = `${birdsData[j][i].name}`;
	}
}
//реагируем на выбор варианта
const navMenu = Array.from(document.querySelectorAll('.menu__item'));
const newLevel = document.querySelector('.main__level');
choiceBird(questionGroup);
randomBird = randomNumber();
aydioPlayerRun(".question__player", audioQuestion, questionGroup, randomBird);


function randomNumber() {
	{
		let array = [];
		for (let i = 0; i < 6; i++) {
			array[i] = i;
		}
		array.sort(() => Math.random() - 0.5);
		return array[0];
	}
}






//формируем картинку с информацией о выбранной птице,
//общая функия для quetion и answer
function infoBird(j, i) {
	const answerBlock = document.querySelector('.answer__content');
	const answerName = document.querySelector('.answer__name');
	const answerKind = document.querySelector('.answer__kind');
	const answerText = document.querySelector('.answer__text');
	const answerImg = document.querySelector('.answer__img');
	answerName.innerHTML = `${birdsData[j][i].name}`;
	answerKind.innerHTML = `${birdsData[j][i].species}`;
	answerText.innerHTML = `${birdsData[j][i].description}`;
	answerImg.src = `${birdsData[j][i].image}`;

}

//реагируем на выбор птицы
selectBird = document.querySelectorAll('.choice__input');
const answerContent = document.querySelector('.answer__content');
const answerGreeting = document.querySelector('.answer__greeting');
const questionImg = document.querySelector('.question__img');
const questionName = document.querySelector('.question__name');
const gameScore = document.querySelector('.header__result');
const questionImage = document.querySelector('.question__image');
let winLevel = false;
selectBird.forEach((item => {
	item.addEventListener('change', () => {
		answerContent.classList.remove('unvisible');
		answerGreeting.classList.add('unvisible');
		infoBird(questionGroup, item.value);
		aydioPlayerRun(".answer__player", audio, questionGroup, item.value);
		steps++;
		if ((Number(item.value) + 1) == birdsData[questionGroup][randomBird].id) {
			winLevel = true;
			musicSelect();
			audioQuestion.pause();
			item.classList.add('choice__win');
			questionImg.src = `${birdsData[questionGroup][randomBird].image}`;
			newLevel.classList.add('next__level');
			questionName.innerHTML = `${birdsData[questionGroup][randomBird].name}`;
			switch (steps) {
				case 1: score += 5; break;
				case 2: score += 4; break;
				case 3: score += 3; break;
				case 4: score += 2; break;
				case 5: score += 1; break;
				case 6: score += 0; break;
			}
			gameScore.innerHTML = `${score}`;
			if (questionGroup == 5) {
				localStorage.setItem('score', score);
				window.location.href = 'win.html';
			}
		} else if (winLevel != true) { item.classList.add('choice__nowin'); musicFalseSelect(); }
		if ((winLevel == true) && ((Number(item.value) + 1) != birdsData[questionGroup][randomBird].id)) { item.classList.add('choice__nocolor'); }
	})
}))

newLevel.addEventListener('click', () => {
	if (newLevel.classList.contains('next__level')) {
		console.log('yes');
		selectBird.forEach(item => {
			item.classList.remove('choice__win');
			item.classList.remove('choice__nowin');
			item.checked = false;
		})
		navMenu.forEach(item => {
			item.classList.remove('active');
		})
		questionGroup++;
		console.log(questionGroup);
		choiceBird(questionGroup);
		navMenu[questionGroup].classList.add('active');
		//randomNumber возвращает случайное число
		randomBird = randomNumber();
		newLevel.classList.remove('next__level');
		answerGreeting.classList.remove('unvisible');
		answerContent.classList.add('unvisible');
		questionName.innerHTML = `*******`;
		questionImage.innerHTML = `<img src="./assets/1.jpg" alt="" class="question__img">`;
		steps = 0;
		winLevel = false;
		aydioPlayerRun(".question__player", audioQuestion, questionGroup, randomBird);
	}
})


// audioPlayer = document.querySelector('.answer__player');
// let playBtn = audioPlayer.querySelector(".play-container .toggle-play");
// //проигрыватель
// playBtn.addEventListener(
// 	"click",
// 	() => {
// 		console.log(audio.paused);
// 		if (audio.paused) {
// 			console.log('первое');
// 			playBtn.classList.remove("playpro");
// 			playBtn.classList.add("pause");
// 			audio.play();
// 		}
// 		else {
// 			console.log('второе');
// 			playBtn.classList.remove("pause");
// 			playBtn.classList.add("playpro");
// 			audio.pause();
// 		}
// 	}
// );


// function audioPlay(classDom, j, i) {
// 	audio.src = `${birdsData[j][i].audio}`;
// 	console.log(audio);
// 	audio.currentTime = 0;
// 	audio.pause();
// 	if (classDom == "question__player") {
// 		audioPlayer = document.querySelector('.question__player');
// 	}
// 	if (classDom == "answer__player") {
// 		audioPlayer = document.querySelector('.answer__player');
// 	}
// }
// audio.addEventListener(
// 	"loadeddata",
// 	() => {
// 		audioPlayer.querySelector(".time-play .length").textContent = getTimeCodeFromNum(
// 			audio.duration
// 		);
// 		audio.volume = .75;

// 	},
// 	false
// );

// let timeToSeek;
// //click on timeline to skip around
// const timeline = audioPlayer.querySelector(".timeline");
// timeline.addEventListener("click", e => {
// 	const timelineWidth = window.getComputedStyle(timeline).width;
// 	timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
// 	audio.currentTime = timeToSeek;
// }, false);

// //click volume slider to change volume
// const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
// volumeSlider.addEventListener('click', e => {
// 	const sliderWidth = window.getComputedStyle(volumeSlider).width;
// 	const newVolume = e.offsetX / parseInt(sliderWidth);
// 	audio.volume = newVolume;
// 	audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

// //check audio percentage and update time accordingly

// setInterval(() => {
// 	const progressBar = audioPlayer.querySelector(".progress");
// 	progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
// 	audioPlayer.querySelector(".time-play .current").textContent = getTimeCodeFromNum(
// 		audio.currentTime
// 	);
// }, 500);


//  //toggle between playing and pausing on button click

// let volumeButton = audioPlayer.querySelector(".volume-button");
// volumeButton.addEventListener("click", () => {
// 	console.log(audio.muted);
// 	if (!audio.muted) {
// 		audio.muted = true;
// 		volumeButton.classList.remove("source");
// 		volumeButton.classList.add("source-no");

// 	} else {
// 		audio.muted = false;
// 		volumeButton.classList.remove("source-no");
// 		volumeButton.classList.add("source");

// 	}
// });

// //turn 128 seconds into 2:08
// function getTimeCodeFromNum(num) {
// 	let seconds = parseInt(num);
// 	let minutes = parseInt(seconds / 60);
// 	seconds -= minutes * 60;
// 	const hours = parseInt(minutes / 60);
// 	minutes -= hours * 60;

// 	if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
// 	return `${String(hours).padStart(2, 0)}:${minutes}:${String(
// 		seconds % 60
// 	).padStart(2, 0)}`;
// }


