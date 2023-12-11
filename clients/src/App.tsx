import { useEffect, useState } from 'react'

// import './App.css'
import Main from './pages/Main'
import { Route, Routes } from 'react-router-dom'
import Contacts from './pages/Contacts'
import Success from './pages/Success'


function App() {  
  
  const [orderInfo, setOrderInfo] = useState({name:'', id:'', title:'', fid:'', date:'', time:''})
  useEffect(()=>{
    console.log(orderInfo)
  },[])
   return (
    <Routes>
      <Route path='/' element={<Main setInfo={setOrderInfo} />} />
      <Route path='/success' element={<Success/>} />
      <Route path='/contact' element={<Contacts info = {orderInfo} />} />
    </Routes>
    
  )
}

export default App
