import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Summary from './pages/Summary'
import { useGlobalContext } from './hooks/useGlobalContext'
import ProtectedLayout from './layout/ProtectedLayout'
import Predict from './pages/Predict'


const App = () => {
  const {results} = useGlobalContext();
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' index element={<Predict/>}/>
    </Route>
  ))

  return <RouterProvider router={router}/>
}

export default App
