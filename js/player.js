import birdsData from './birds.js';
export function aydioPlayerRun(classElement, audio, j, i) {
	let audioPlayer = document.querySelector(classElement);
	let playBtn = audioPlayer.querySelector(".play-container .toggle-play");
	let currentTime = 0;
	audio.currentTime = 0;
	audio.src = `${birdsData[j][i].audio}`;
	audio.load();
	let playing = true;
	function playAudio() {
		if (playing) {

			playBtn.classList.remove("playpro");
			playBtn.classList.add("pause");
			audio.play();
			playing = false;
			audio.currentTime = currentTime;
		}
		else {
			playBtn.classList.remove("pause");
			playBtn.classList.add("playpro");
			audio.pause();
			currentTime = audio.currentTime;
			playing = true;
		}
		if (currentTime == audio.duration) {
			currentTime = 0;
		}
	}
	//проигрыватель
	playBtn.addEventListener(
		"click",
		() => {
			playAudio();
		}
	);
	audio.addEventListener(
		"loadeddata",
		() => {
			audioPlayer.querySelector(".time-play .length").textContent = getTimeCodeFromNum(
				audio.duration
			);
			audio.volume = .75;

		},
		false
	);

	let timeToSeek;
	//click on timeline to skip around
	const timeline = audioPlayer.querySelector(".timeline");
	timeline.addEventListener("click", e => {
		const timelineWidth = window.getComputedStyle(timeline).width;
		timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
		audio.currentTime = timeToSeek;
	}, false);

	//click volume slider to change volume
	const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
	volumeSlider.addEventListener('click', e => {
		const sliderWidth = window.getComputedStyle(volumeSlider).width;
		const newVolume = e.offsetX / parseInt(sliderWidth);
		audio.volume = newVolume;
		audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
	}, false)

	//check audio percentage and update time accordingly

	setInterval(() => {
		const progressBar = audioPlayer.querySelector(".progress");
		progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
		audioPlayer.querySelector(".time-play .current").textContent = getTimeCodeFromNum(
			audio.currentTime
		);
	}, 500);


	//toggle between playing and pausing on button click
	audio.muted = false;
	let volumeButton = audioPlayer.querySelector(".volume-button");
	volumeButton.addEventListener("click", () => {
		console.log(audio.muted);
		if (!audio.muted) {
			audio.muted = true;
			volumeButton.classList.remove("source");
			volumeButton.classList.add("source-no");

		} else {
			audio.muted = false;
			volumeButton.classList.remove("source-no");
			volumeButton.classList.add("source");

		}
	});

	//turn 128 seconds into 2:08
	function getTimeCodeFromNum(num) {
		let seconds = parseInt(num);
		let minutes = parseInt(seconds / 60);
		seconds -= minutes * 60;
		const hours = parseInt(minutes / 60);
		minutes -= hours * 60;

		if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
		return `${String(hours).padStart(2, 0)}:${minutes}:${String(
			seconds % 60
		).padStart(2, 0)}`;
	}
}