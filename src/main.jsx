import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FireBaseProvider } from './Context/FirebaseProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FireBaseProvider>
      <App />
    </FireBaseProvider>
  </React.StrictMode>,
)
