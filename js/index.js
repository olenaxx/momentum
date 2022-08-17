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


function playAudio() {
  if (!isPlay) {
    isPlay = true;
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

function playItems() {
  playItem.forEach((item)=>item.classList.remove('item-active'))
}


playBtn.addEventListener('click', playAudio)

function playsNext() {
playItems()
  if (playNum === playList.length - 1) {
    playNum = 0
  } else {
    playNum++
  }

    isPlay = true;
    audio.src = playList[playNum].src;
    console.log('playNum', playNum);
    playItem[playNum].classList.add('item-active')
    playBtn.classList.add('pause');
    audio.currentTime = 0; 
    audio.play();
}

function playsPrev() {
  playItems()
  playBtn.classList.add('pause');
  if (playNum === 0) {
    playNum = playList.length - 1
  } else {
    playNum--
  }

    isPlay = true;
    audio.src = playList[playNum].src;
    console.log('playNum', playNum);
    playItem[playNum].classList.add('item-active')
    playBtn.classList.add('pause');
    audio.currentTime = 0; 
    audio.play();
}

playNext.addEventListener('click', playsNext)
playPrev.addEventListener('click', playsPrev)


