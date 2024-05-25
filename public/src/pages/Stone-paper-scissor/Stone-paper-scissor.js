import './Stone-paper-scissor.css'

export const initSPS = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  let counterComputer = localStorage.getItem('counterComputer') || 0
  let counterPerson = localStorage.getItem('counterPerson') || 0

  const sectionInformation = document.createElement('section')
  const divScore = document.createElement('div')
  const compScore = document.createElement('p')
  const userScore = document.createElement('p')

  sectionInformation.className = 'ppt-information'
  divScore.className = 'score-ppt'
  compScore.textContent = 'Computer: ' + counterComputer
  userScore.textContent = 'Person: ' + counterPerson

  divScore.append(userScore)
  divScore.append(compScore)
  sectionInformation.append(divScore)
  main.append(sectionInformation)

  const sectionGame = document.createElement('section')
  const divOptions = document.createElement('div')
  const stone = document.createElement('p')
  const paper = document.createElement('p')
  const scissor = document.createElement('p')

  sectionGame.className = 'game-sps'
  divOptions.className = 'options'
  stone.textContent = '👊'
  stone.id = 'stone'
  paper.textContent = '✋'
  paper.id = 'paper'
  scissor.textContent = '✌️'
  scissor.id = 'scissor'

  divOptions.append(stone)
  divOptions.append(paper)
  divOptions.append(scissor)
  sectionGame.append(divOptions)
  main.append(sectionGame)

  function tems(selected) {
    const prevResult = document.querySelector('.result')
    if (prevResult) {
      prevResult.remove()
    }

    const options = ['👊', '✋', '✌️']
    const computerChoice = options[generateRandom(0, 3)]
    const result = document.createElement('p')

    result.classList.add('result')
    result.textContent = 'Computer: ' + computerChoice

    sectionGame.appendChild(result)

    if (selected === computerChoice) {
      result.textContent += ' (Draw)'
    } else if (
      (selected === '👊' && computerChoice === '✌️') ||
      (selected === '✋' && computerChoice === '👊') ||
      (selected === '✌️' && computerChoice === '✋')
    ) {
      result.textContent += ' (You Win)'
      counterPerson++
    } else {
      result.textContent += ' (Computer Wins)'
      counterComputer++
    }

    userScore.textContent = 'Person: ' + counterPerson
    compScore.textContent = 'Computer: ' + counterComputer

    localStorage.setItem('counterComputer', counterComputer)
    localStorage.setItem('counterPerson', counterPerson)

    updateScoreColors()
  }

  function updateScoreColors() {
    if (counterPerson > counterComputer) {
      userScore.style.color = 'green'
      compScore.style.color = 'red'
    } else if (counterPerson < counterComputer) {
      userScore.style.color = 'red'
      compScore.style.color = 'green'
    } else {
      userScore.style.color = 'black'
      compScore.style.color = 'black'
    }
  }

  stone.addEventListener('click', () => {
    tems('👊')
  })

  paper.addEventListener('click', () => {
    tems('✋')
  })

  scissor.addEventListener('click', () => {
    tems('✌️')
  })
}
