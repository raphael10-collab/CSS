import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import App from './components/App'
import { GlobalStyle } from './styles/global'


import Prism from 'prismjs'
import 'prismjs/themes/prism-coy.css'

Prism.highlightAll()

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('app'))

//import TabsPage from './sections/harvesting/web/electron-tabs/Tabs'

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />

  </React.StrictMode>
)
