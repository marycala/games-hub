import { images } from '../../../assets/Memory-Game/images'
import './Memory-Game.css'

export const initMemory = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const sectionInformation = document.createElement('section')
  sectionInformation.className = 'memory-information'

  let score = 0
  const divScore = document.createElement('div')
  divScore.className = 'score-memory'
  const pScore = document.createElement('p')
  pScore.textContent = `Score: ${score}`

  const divButtonRestart = document.createElement('div')
  const buttonRestart = document.createElement('button')

  buttonRestart.textContent = 'Restart'
  buttonRestart.id = 'restart'

  buttonRestart.addEventListener('click', () => initMemory())

  divScore.append(pScore)
  divButtonRestart.append(buttonRestart)
  sectionInformation.append(divScore)
  sectionInformation.append(divButtonRestart)
  main.append(sectionInformation)

  const sectionGame = document.createElement('section')
  sectionGame.className = 'memory-game'

  images.forEach((image) => {
    const divCards = document.createElement('div')
    const imgFront = document.createElement('img')
    const imgBack = document.createElement('img')

    divCards.className = 'memory-card'
    imgFront.src = image
    imgFront.alt = 'Image'
    imgFront.className = 'front-face'
    imgBack.src = './assets/Memory-Game/back-face.jpg'
    imgBack.alt = 'Memory Card'
    imgBack.className = 'back-face'

    divCards.append(imgFront)
    divCards.append(imgBack)
    sectionGame.append(divCards)
  })
  main.append(sectionGame)

  const cards = document.querySelectorAll('.memory-card')

  let hasFlippedCard = false
  let lockBoard = false
  let firstCard, secondCard

  function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')

    if (!hasFlippedCard) {
      hasFlippedCard = true
      firstCard = this
      return
    }

    secondCard = this

    checkForMatch()
  }

  function checkForMatch() {
    const firstCardImg = firstCard.querySelector('.front-face')
    const secondCardImg = secondCard.querySelector('.front-face')

    let isMatch = firstCardImg.src === secondCardImg.src

    isMatch ? disableCards() : unflipCards()
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    score++
    pScore.textContent = `Score: ${score}`

    resetBoard()
  }

  function unflipCards() {
    lockBoard = true

    setTimeout(() => {
      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')

      resetBoard()
    }, 1500)
  }

  function resetBoard() {
    ;[hasFlippedCard, lockBoard] = [false, false]
    ;[firstCard, secondCard] = [null, null]
  }

  ;(function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 12)
      card.style.order = randomPos
    })
  })()

  cards.forEach((card) => card.addEventListener('click', flipCard))
}
