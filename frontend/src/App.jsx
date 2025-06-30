import React from 'react'

import  { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Header from './components/Header'
import DashboardPage from './pages/DashboardPage'
import PurchasePage from './pages/PurchasePage'
import TransferPage from './pages/TransferPage'
import AssignmentPage from './pages/AssignmentPage'
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<DashboardPage/>}/>
      <Route path='/purchases' element={<PurchasePage/>}/>
      <Route path='/transfers' element={<TransferPage/>}/>
      <Route path='/assignments' element={<AssignmentPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
