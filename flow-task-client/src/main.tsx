import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './routes'
import QueryProvider from './providers/query-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <Routes />
    </QueryProvider>
  </React.StrictMode>,
)
