import React, { Fragment } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Footer from './components/Footer'
import Logo from './images/tetrix_logo_dark.svg'
import favicon from './images/faviconTetrix.png'

const ExampleQuestions = () => (
  <Fragment>
      <Helmet>
        <title>Tetrix - O Desafio Universitário</title>
        <meta name="title" content="Tetrix" />
        <meta name="description" content="O desafio universitário da VTEX" />
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
        <meta
          name="google-site-verification"
          content="WwFB6guJNrYrVApfMf_WmoCLNmptYJ_Vgk_i1DpgYLY"
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tetrix.vtex.com/" />
        <meta property="og:title" content="Tetrix" />
        <meta
          property="og:description"
          content="O desafio universitário da VTEX"
        />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tetrix.vtex.com/" />
        <meta property="twitter:title" content="Tetrix" />
        <meta
          property="twitter:description"
          content="O desafio universitário da VTEX"
        />
      </Helmet>
      <main className="w-100 bg-white">
        <div className="w-80-l w-90 center">
          <a href="/tetrix">
            <img src={Logo} className="w-33 pb6 pt8" />
          </a>
          <section className="pv4 lh-copy bb b--muted-3">
            <h1 className="t-heading-1 mt0 c-emphasis">Questão 1</h1>
            <p>O Dia dos Solteiros é um festival de entretenimento comemorado na China para celebrar a data de ser solteiro, sendo sempre realizado no dia 11 de novembro (11/11, em alusão ao fato de o número 1 representar uma pessoa sozinha)</p>
            <p>Em 2009, o Dia de Solteiros foi adotado pela gigante do e-commerce chinesa Alibaba como equivalente da "Black Friday" Atualmente, nesta data, milhões de chineses aproveitam os descontos, independentemente de estarem ou não solteiros, compram presentes para amigos, familiares ou para uso próprio.</p>
            <p>Qual a porcentagem de consumidores comprou produtos de marcas não-chinesas em 2018 no Tmall.com, o principal site de vendas B2C chinês:</p>
            <ul className="list">
              <li><p>a{')'} 20%</p></li>
              <li><p>b{')'} 30%</p></li>
              <li><p><strong>c{')'} 40%</strong></p></li>
              <li><p>d{')'} 50%</p></li>
            </ul>
          </section>
          <section className="pv4 lh-copy bb b--muted-3">
            <h1 className="t-heading-1 c-emphasis">Questão 2</h1>
            <p>Você dispõe de 32 motos com tanque completo. Cada moto consegue percorrer, utilizando todo o tanque, uma distância de 50 km. Qual a máxima distância que você pode percorrer utilizando todas as motos?</p>
            <ul className="list">
              <li><p>a{')'} 1600 km</p></li>
              <li><p>b{')'} 800 km</p></li>
              <li><p><strong>c{')'} 175 km</strong></p></li>
              <li><p>d{')'} 50 km</p></li>
            </ul>
          </section>
          <section className="pv4 lh-copy bb b--muted-3">
            <h1 className="t-heading-1 c-emphasis">Questão 3</h1>
            <p>Um brasileiro, um chileno e um francês se encontram em um elevador. Com qual das palavras abaixo eles concordariam em gênero e número?</p>
            <ul className="list">
              <li><p>a{')'} Dente</p></li>
              <li><p><strong>b{')'} Maçã</strong></p></li>
              <li><p>c{')'} Viagem</p></li>
              <li><p>d{')'} Conta</p></li>
            </ul>
          </section>
          <section className="pv4 lh-copy bb b--muted-3">
            <h1 className="t-heading-1 c-emphasis">Questão 4</h1>
            <p>Assinale a alternativa que contém uma informação incorreta:</p>
            <ul className="list">
              <li><p><strong>a{')'} Em seu segundo encontro com o ditador da Coreia do Norte, Kim Jong Un, Donald Trump tornou-se o primeiro presidente em exercício dos Estados Unidos a pisar em solo norte coreano.</strong></p></li>
              <li><p>b{')'} O governo da Nigéria, país mais populoso do continente e uma das maiores economias africanas, anunciou o interesse em criar um acordo de livre comércio com outros estados africanos, como estratégia para intensificar o comércio entre esses países.</p></li>
              <li><p>c{')'} A União Européia e o Mercosul anunciaram um histórico acordo de livre comércio. O acordo, cujas negociações começaram em 1999, visa a eliminar tarifas em mais de 90% das mercadorias comercializadas entre os blocos.</p></li>
              <li><p>d{')'} Na reunião da cúpula do G20, realizada no Japão, o presidente americano Donald Trump concordou em não aprovar novas tarifas para cerca de $300 bilhões em mercadorias chinesas. Em troca, o presidente chinês Xi Jinping concordou em aprovar a compra de novos produtos agrícolas americanos.</p></li>
            </ul>
          </section>
          <section className="pv4 lh-copy">
            <h1 className="t-heading-1 c-emphasis">Questão 5</h1>
            <p>IPO (Initial Public Offering) é uma sigla para Oferta Pública Inicial (ou OPI). Como o próprio nome diz, é quando uma empresa vende ações para o público pela primeira vez.</p>
            <p>Qual das empresas de tecnologia abaixo ainda não realizou seu IPO:</p>
            <ul className="list">
              <li><p>a{')'} Slack</p></li>
              <li><p>b{')'} Uber</p></li>
              <li><p>c{')'} Lyft</p></li>
              <li><p><strong>d{')'} Airbnb</strong></p></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </Fragment>
)

export default ExampleQuestions
