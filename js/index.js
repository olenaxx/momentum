import playList from '../playList.js';

const playPrev = document.querySelector('.play-prev')
const playBtn = document.querySelector('.play')
const playNext = document.querySelector('.play-next')
const playListItem = document.querySelector('.play-list')
let isPlay = false;
let playNum = 0

const audio = new Audio();

playList.forEach(el => {
const li = document.createElement('li')
li.classList.add('play-item')
li.textContent = el.title
playListItem.append(li)
})

const playItem = [...document.querySelectorAll('.play-item')]



// playBtn.addEventListener('click', playAudioBtn);

function playAudio() {
  if (!isPlay) {
    // isPlay = true;
    audio.src = playList[playNum].src;
    console.log('playNum', playNum);
    playItem[playNum].classList.toggle('item-active')
    playBtn.classList.add('pause');
    audio.currentTime = 0; 
    audio.play();
  } else {
    playItem[playNum].classList.remove('item-active')
    isPlay = false;
    playBtn.classList.remove('pause');
    audio.pause();
  }
}


playBtn.addEventListener('click', playAudio)

function playsNext() {

  if (playNum === playList.length - 1) {
    playNum = 0
  } else {
    playNum++
    playAudio(true)
  }
}

function playsPrev() {
  playBtn.classList.add('pause');
  if (playNum === 0) {
    playNum = playList.length - 1
  } else {
    playNum--
  }
  playAudio()
}

playNext.addEventListener('click', playsNext)
playPrev.addEventListener('click', playsPrev)


