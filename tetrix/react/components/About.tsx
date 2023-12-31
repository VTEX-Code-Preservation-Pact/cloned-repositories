import React, { FunctionComponent } from 'react'

import Icon1 from '../images/icone1.png'
import Icon2 from '../images/icone2.png'
import Icon3 from '../images/icone3.png'
import Icon4 from '../images/icone4.png'
import Icon5 from '../images/icone5.png'
import Icon6 from '../images/icone6.png'
import Icon7 from '../images/icone7.png'
import Icon8 from '../images/icone8.png'

const About: FunctionComponent = () => {
  const iconClasses =
    'w-25-l w-90 pa5 flex flex-column items-center justify-center'

  return (
    <section
      id="about"
      className="pa7 flex flex-row-l flex-column justify-between items-center mv8"
    >
      <div className="w-33-l">
        <p className="t-heading-2 c-emphasis">O QUE É O TETRIX?</p>
        <p className="t-body lh-copy">
          O Tetrix é um desafio universitário que foi desenvolvido pela VTEX
          para testar e validar os diferentes tipos de habilidades dos
          participantes. Através de perguntas que conectam múltiplos
          conhecimentos, o Tetrix propõe um um nível de complexidade
          progressiva, que ajuda a identificar diferentes perspectivas e buscar
          solucionadores.
        </p>
      </div>
      <div className="flex justify-around items-center flex-wrap w-60-l">
        <div className={iconClasses}>
          <img src={Icon1} style={{ width: '100px', height: '100px' }} />
          <p className="c-emphasis tc">EVOLUÇÃO</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon2} style={{ width: '100px', height: '100px' }} />
          <p className="tc">CONHECIMENTO TÉCNICO E DE MERCADO</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon3} style={{ width: '100px', height: '100px' }} />
          <p className="c-emphasis tc">AUDÁCIA</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon4} style={{ width: '100px', height: '100px' }} />
          <p className="tc">PENSAMENTO LÓGICO</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon5} style={{ width: '100px', height: '100px' }} />
          <p className="tc">ADMIRAÇÃO COLETIVA</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon6} style={{ width: '100px', height: '100px' }} />
          <p className="c-emphasis tc">CONEXÃO</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon7} style={{ width: '100px', height: '100px' }} />
          <p className="tc">COMUNICAÇÃO</p>
        </div>
        <div className={iconClasses}>
          <img src={Icon8} style={{ width: '100px', height: '100px' }} />
          <p className="c-emphasis tc">VOZ DE REFERÊNCIA</p>
        </div>
      </div>
    </section>
  )
}

export default About
