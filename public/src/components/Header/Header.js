import { initMole } from '../../pages/Whac-a-Mole/Whac-a-Mole'
import { initMemory } from '../../pages/Memory-Game/Memory-Game'
import { initSPS } from '../../pages/Stone-paper-scissor/Stone-paper-scissor'

import './Header.css'

export const Header = (divApp) => {
  const header = document.createElement('header')
  const buttonMole = document.createElement('button')
  const buttonMemory = document.createElement('button')
  const buttonSPS = document.createElement('button')

  buttonMole.textContent = 'Whac A Mole!!!💥'
  buttonMole.id = 'buttonMole'
  buttonMemory.textContent = 'Memory Game 🧠'
  buttonMemory.id = 'buttonMemory'
  buttonSPS.textContent = '👊    ✋    ✌️'
  buttonSPS.id = 'buttonSPS'

  buttonMole.addEventListener('click', initMole)
  buttonMemory.addEventListener('click', initMemory)
  buttonSPS.addEventListener('click', initSPS)

  header.append(buttonMole)
  header.append(buttonMemory)
  header.append(buttonSPS)
  divApp.append(header)
}
