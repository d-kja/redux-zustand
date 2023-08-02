import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

import { Provider as ReduxProvider } from 'react-redux'
import { globalStore } from './stores/global-store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={globalStore}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
)
