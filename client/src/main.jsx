import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import {Provider} from 'react-redux'
import { persitStor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persitStor}>
      <Provider store={store}>
          <App />
      </Provider>,
  </PersistGate>
  
)