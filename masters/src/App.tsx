import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Reg from './pages/loginandSignup/Reg'
import Login from './pages/loginandSignup/Login'
import Person from './pages/person/Person'

function App() {
  const [masterInfo, setMasterInfo] = useState()

  return (
    <>
    <Routes>
      <Route path='/reg' element={<Reg setMasterInfo={setMasterInfo} />} />
      <Route path='/login' element={<Login setMasterInfo={setMasterInfo} />} />
      <Route path='/person' element={<Person masterInfo={masterInfo} />} />
    </Routes>
      
    </>
  )
}

export default App
