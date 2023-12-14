import { useState } from 'react'
import './Reg.css'
import { useNavigate } from 'react-router-dom'
const Login = ({setMasterInfo} : any) => {
  const [inputsInfo, setInputsInfo] = useState({name:'', password:'', email:''})
  const navigate = useNavigate()



  const handlerClick = async() => {
    if(!(inputsInfo.name && inputsInfo.email && inputsInfo.password)) return
    if(!(localStorage.getItem('token'))) {
        console.log('Error')
        return
    }

    const token = localStorage.getItem('token') 
    const response = await fetch('http://localhost:3000/master/login', {
      method: 'POST',
      body: JSON.stringify(token),
      headers: {
        
        'token': `${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const data = await response.json()
    setInputsInfo(data)
    navigate('/person')
  }
  
  return (
    <div className='login'>
      <div className='inputWrapper'>
        <input type="text" placeholder='Имя' value={inputsInfo.name} onChange={(e)=>setInputsInfo({...inputsInfo, name:e.target.value})} />
        <input type="text" placeholder='Пароль' value={inputsInfo.password} onChange={(e)=>setInputsInfo({...inputsInfo, password:e.target.value})} />
        <input type="text" placeholder='Email' value={inputsInfo.email} onChange={(e)=>setInputsInfo({...inputsInfo, email:e.target.value})} />
      </div>
      <button onClick={()=>handlerClick()} >Войти</button>
    </div>
  )
}

export default Login