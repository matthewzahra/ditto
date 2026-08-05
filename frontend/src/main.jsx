import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { UnreadMessagesProvider } from './context/UnreadMessagesContext.jsx'
import WebSocketProvider from './websocket/WebSocketProvider.jsx'
import PageTitle from "./components/PageTitle/PageTitle.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UnreadMessagesProvider>
            <WebSocketProvider>
              <PageTitle />
              <App />
            </WebSocketProvider>
        </UnreadMessagesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
