import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import SignIn from './Pages/SignIn.jsx'
import SignUp from './Pages/SignUp.jsx'
import ErrorPage from './Pages/Error/ErrorPage.jsx'
import DartBoard from './Pages/DartsBord.jsx'
import Info from './Pages/Info.jsx'
import RootLayout from './Navigation/RootLayout.jsx'
import './App.css'

const browserRouter = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/Login',
        element: <SignIn />,
      },
      {
        path: '/Register',
        element: <SignUp />,
      },
      {
        path: '/Info',
        element: <Info />,
      }
    ],
    errorElement: <ErrorPage/>,
  },
  {
    path: '/game',
    element: <DartBoard />,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
      <RouterProvider  router={browserRouter}>
        <App />
      </RouterProvider>
  </React.StrictMode>,
)
