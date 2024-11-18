import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Summary from './pages/Summary'
import { useGlobalContext } from './hooks/useGlobalContext'
import ProtectedLayout from './layout/ProtectedLayout'


const App = () => {
  const {results} = useGlobalContext();
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' index element={<Home/>}/>
      <Route element={<ProtectedLayout/>}>
        <Route path='/summary' element={<Summary/>}/>
      </Route>
    </Route>
  ))

  return <RouterProvider router={router}/>
}

export default App
