import ReactDOM from 'react-dom/client'
import React, {Suspense} from 'react'
import {QueryClientProvider} from '@tanstack/react-query'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App.tsx'
import './normalize.css'
import './main.css'
import {store} from '@/store'
import {queryClient} from '@/api'
import './assets/fonts/fonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HashRouter>
          <Suspense>
            <App />
          </Suspense>
        </HashRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
