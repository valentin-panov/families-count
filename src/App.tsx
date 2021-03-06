import React, { ReactElement } from 'react'
import './styles/common.scss'
import { Main } from './components/Main'
import { Layout } from './components/Layout'
import { Output } from './components/Output'

export const serverURL = 'https://front-test.beta.aviasales.ru'

function App(): ReactElement {
  return (
    <Layout>
      <Main>
        <Output />
      </Main>
    </Layout>
  )
}

export default App
