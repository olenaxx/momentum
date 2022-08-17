const time = document.querySelector('.time')
const dates = document.querySelector('.date')

const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')

const body = document.querySelector('body')

const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')

let randomNum;


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity');


const changeQuote = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')


// const playPrev = document.querySelector('.play-prev')
// const play = document.querySelector('.play')
// const playNext = document.querySelector('.play-next')



/*----------- time and date ----------------*/

const showDate = () => {
  const date = new Date()
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options)
  dates.textContent = currentDate
}


/*------------  greeting --------------*/

const getTimeOfDay = () => {
  const date = new Date()
  const hours = date.getHours()
  
  switch (hours) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 'night'
    
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return 'morning'
    
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return 'afternoon'
    
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      return 'evening'
  }
}

const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText
}


/*----------- time and date ----------------*/

const showTime = () => {
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  time.textContent = currentTime
  showDate()
  showGreeting()
  setTimeout(showTime, 1000)
}

showTime()


/*----------- local storage ----------------*/

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)


/*----------- image slider ----------------*/

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const timeOfDay = getTimeOfDay()
const bgNum = (getRandomNum(1, 20) + '').padStart(2, '0');



const setBg = () => {
  // const timeOfDay = getTimeOfDay()
  // const bgNum = (getRandomNum(1, 20) + '').padStart(2, '0');
  // console.log(bgNum);
  // const urlBgImage = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  
  // return urlBgImage
  
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  // console.log(bgNum);
}

setBg()

// body.style.backgroundImage = `url(${setBg()})`

// randomNum = getRandomNum()

// const getSlidePrev = () => {
//   setBg()
// }


const getSlidePrev = () => {
  setBg()
  
  randomNum = (+bgNum - 1 + '').padStart(2, '0');
  if (randomNum < 01) {
    return randomNum = 20;
  }
  // console.log(randomNum);
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
} 
getSlidePrev()

const getSlideNext = () => {
  setBg()
  
  randomNum = (+bgNum + 1 + '').padStart(2, '0');
  if (randomNum > 20) {
    return randomNum = 01;
  }
  // console.log(randomNum);
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
  // console.log(randomNum);
} 
getSlideNext()

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

/*----------- weather widget ----------------*/

// e114ff461f0d5bea791b0ed5518dbab5

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e114ff461f0d5bea791b0ed5518dbab5&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

city.addEventListener('change', getWeather)


/*----------- Quote of the day widget ----------------*/


function update(data) {
  const rand = data[Math.floor(Math.random() * data.length)];
  quote.textContent = rand.text
  author.textContent = rand.author
}

async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

  update(data)
}

changeQuote.addEventListener('click', getQuotes)
document.addEventListener("DOMContentLoaded", getQuotes);

