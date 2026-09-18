import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { authApi } from './services/api'
import { clearSession, finishRestore, restoreSession } from './store/authSlice'
import './index.css'
import './global.css'
import App from './App'

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      store.dispatch(finishRestore())
      return
    }
    authApi.me()
      .then(({ user }) => store.dispatch(restoreSession({ token, user })))
      .catch(() => store.dispatch(clearSession()))
  }, [])

  return children
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthBootstrap>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthBootstrap>
    </Provider>
  </StrictMode>,
)
