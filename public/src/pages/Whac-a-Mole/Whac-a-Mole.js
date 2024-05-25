import './Whac-a-Mole.css'

let cartoons = 8
let score = 0
let timer = 60
let popupLength = 1200
let clickable = false
let paused = true
let moleTimeout
let countdownInterval

export const initMole = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  setupGame()
  createHills()
}

const createHills = () => {
  const main = document.querySelector('main')
  const sectionGame = document.createElement('section')
  sectionGame.className = 'game'

  for (let i = 0; i < cartoons; i++) {
    const divCartoon = document.createElement('div')
    divCartoon.className = 'cartoon-normal'

    const hill = document.createElement('img')
    hill.className = 'hill'
    hill.src = './assets/Whac-a-Mole/mole-hill.png'

    divCartoon.appendChild(hill)
    sectionGame.appendChild(divCartoon)
  }

  main.appendChild(sectionGame)
}

const setupGame = () => {
  const main = document.querySelector('main')

  const sectionButtons = document.createElement('section')
  const divButtons = document.createElement('div')
  const startButton = document.createElement('button')
  const pauseButton = document.createElement('button')
  const restartButton = document.createElement('button')

  sectionButtons.className = 'sectionButtons'
  divButtons.className = 'buttons'
  startButton.className = 'buttonsMole'
  startButton.textContent = 'Start'
  startButton.type = 'submit'
  pauseButton.className = 'buttonsMole'
  pauseButton.textContent = 'Pause'
  pauseButton.type = 'submit'
  restartButton.className = 'buttonsMole'
  restartButton.textContent = 'Restart 🔄'
  restartButton.type = 'submit'

  const toggleButton = () => {
    if (paused) {
      startButton.classList.add('show')
      pauseButton.classList.remove('show')
    } else {
      pauseButton.classList.add('show')
      startButton.classList.remove('show')
    }
  }

  startButton.addEventListener('click', () => {
    paused = !paused
    toggleButton()
    startGame()
  })

  pauseButton.addEventListener('click', () => {
    paused = !paused
    toggleButton()
    clearTimeout(moleTimeout)
    clearInterval(countdownInterval)
  })

  restartButton.addEventListener('click', () => {
    resetGame()
  })

  toggleButton()

  divButtons.append(startButton)
  divButtons.append(pauseButton)
  divButtons.append(restartButton)
  sectionButtons.append(divButtons)
  main.append(sectionButtons)

  const sectionInformation = document.createElement('section')
  sectionInformation.className = 'information'

  const scoreboard = document.createElement('div')
  scoreboard.classList.add('scoreboard', 'score-holder')
  scoreboard.innerHTML = '<p>Score: <span class="score">0</span></p>'

  const divGameOver = document.createElement('div')
  divGameOver.classList.add('game-over', 'game-over-hidden')
  const p = document.createElement('p')
  p.textContent = 'Game Over'
  divGameOver.append(p)

  const divMoleTimer = document.createElement('div')
  divMoleTimer.className = 'timer'
  divMoleTimer.textContent = 'Timer: ' + timer + ' sec'

  sectionInformation.append(scoreboard)
  sectionInformation.append(divGameOver)
  sectionInformation.append(divMoleTimer)
  main.append(sectionInformation)
}

const startGame = () => {
  const visibleMoles = document.querySelectorAll('.mole-head.head-visible')
  visibleMoles.forEach((mole) => mole.remove())

  if (moleTimeout) clearTimeout(moleTimeout)
  if (countdownInterval) clearInterval(countdownInterval)

  popUpRandomMole()

  countdownInterval = setInterval(() => {
    timer--
    document.querySelector('.timer').textContent = 'Timer: ' + timer + ' sec'
    if (timer <= 0) {
      clearInterval(countdownInterval)
      document.querySelector('.game-over').classList.remove('game-over-hidden')
    }
  }, 1000)
}

const resetGame = () => {
  initMole()

  score = 0
  timer = 60
  popupLength = 1200
  document.querySelector('.score').textContent = score
  document.querySelector('.timer').textContent = 'Timer: ' + timer + ' sec'
  document.querySelector('.game-over').classList.add('game-over-hidden')

  clearTimeout(moleTimeout)
  clearInterval(countdownInterval)

  paused = !paused
}

const popUpRandomMole = () => {
  if (timer <= 0) {
    document.querySelector('.game-over').classList.remove('game-over-hidden')
    return
  }

  const cartoons = document.querySelectorAll('.cartoon-normal')
  const randomIndex = Math.floor(Math.random() * cartoons.length)
  const selectedCartoon = cartoons[randomIndex]

  const moleHead = document.createElement('img')
  moleHead.className = 'mole-head head-hidden'
  moleHead.src = './assets/Whac-a-Mole/mole-head.png'
  selectedCartoon.appendChild(moleHead)

  requestAnimationFrame(() => {
    moleHead.classList.remove('head-hidden')
    moleHead.classList.add('head-visible')
  })

  clickable = true

  moleHead.addEventListener('click', (event) => {
    if (!clickable) return

    score++
    document.querySelector('.score').textContent = score
    popupLength = Math.max(500, popupLength - 100)

    clearTimeout(moleTimeout)
    hideMole(event.target)
  })

  moleTimeout = setTimeout(() => hideMole(moleHead), popupLength)
}

const hideMole = (mole) => {
  clickable = false
  mole.classList.remove('head-visible')
  mole.classList.add('head-hidden')

  setTimeout(() => {
    mole.remove()
    popUpRandomMole()
  }, 400)
}
