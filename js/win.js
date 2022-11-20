let scoreWin = document.querySelector('.main__win');
let scoreOffer = document.querySelector('.main__offer');
let scoreMemory = localStorage.getItem('score');
scoreWin.innerHTML = `Ваш результат: ${scoreMemory}`;
if (scoreMemory < 30) {
	scoreOffer.innerHTML = `Нажмите Game, если хотите сыграть еще раз и набрать больше очков`;
} 
if (scoreMemory == 30) {
	scoreOffer.innerHTML = `Вы набрали максимальное количество очков, игра закончена`;
} 