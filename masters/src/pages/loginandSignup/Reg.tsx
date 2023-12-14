import { useState } from 'react'
import './Reg.css'
import { useNavigate } from 'react-router-dom'
const Reg = ({setMasterInfo}: any) => {
  const [inputsInfo, setInputsInfo] = useState({name:'', password:'', email:''})
  const navigate = useNavigate()

  const handlerClick = async(info: any) => {
    try {
      if(!(inputsInfo.name && inputsInfo.email && inputsInfo.password)) return
      const response = await fetch('http://localhost:3000/master/reg', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          // Добавляем необходимые заголовки
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      const data = await response.json()
      setMasterInfo(data)
      localStorage.setItem('token', JSON.stringify(data.token))

    } catch(e) {
      console.log(e)
    }
    
    
    navigate('/person')
  }
  
  return (
    <div className='login'>
      <div className='inputWrapper'>
        <input type="text" placeholder='Имя' value={inputsInfo.name} onChange={(e)=>setInputsInfo({...inputsInfo, name:e.target.value})} />
        <input type="text" placeholder='Пароль' value={inputsInfo.password} onChange={(e)=>setInputsInfo({...inputsInfo, password:e.target.value})} />
        <input type="text" placeholder='Email' value={inputsInfo.email} onChange={(e)=>setInputsInfo({...inputsInfo, email:e.target.value})} />
      </div>
      <button onClick={()=>handlerClick(inputsInfo)} >Зарегистрироваться</button>
    </div>
  )
}

export default Reg