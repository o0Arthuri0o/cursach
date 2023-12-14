import { useState } from 'react'
import './Contact.css'
import { useNavigate } from 'react-router-dom'
const Contacts = ({info}:any) => {
  const [inputsInfo, setInputsInfo] = useState({name:'', tel:'', email:''})
  const navigate = useNavigate()

  const handlerClick = async(info: any) => {
    const response = await fetch('http://localhost:3000/client', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        // Добавляем необходимые заголовки
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const data = await response.json()
    if (data) navigate('/success')
    
  }
  
  return (
    <div className='contacts'>
      <div>{`${info.name.split('-')[0]}, ${info.title.split('-')[0]}, ${info.date}, ${info.time}`}</div>
      <div className='inputWrapper'>
        <input type="text" placeholder='Имя' value={inputsInfo.name} onChange={(e)=>setInputsInfo({...inputsInfo, name:e.target.value})} />
        <input type="text" placeholder='Телефон' value={inputsInfo.tel} onChange={(e)=>setInputsInfo({...inputsInfo, tel:e.target.value})} />
        <input type="text" placeholder='Email' value={inputsInfo.email} onChange={(e)=>setInputsInfo({...inputsInfo, email:e.target.value})} />
      </div>
      <button onClick={()=>handlerClick({master:{id: info.id, date:info.date, time: info.time}, client: inputsInfo})} >Записаться</button>
    </div>
  )
}

export default Contacts