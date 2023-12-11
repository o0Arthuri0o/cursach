import { useState } from 'react'
import './Contact.css'
import { useNavigate } from 'react-router-dom'
const Contacts = ({info}:any) => {
  const [inputsInfo, setInputsInfo] = useState({name:'', tel:'', email:''})
  const navigate = useNavigate()
  return (
    <div className='contacts'>
      <div>{`${info.name}, ${info.title}, ${info.date}, ${info.time}`}</div>
      <div className='inputWrapper'>
        <input type="text" placeholder='Имя' value={inputsInfo.name} onChange={(e)=>setInputsInfo({...inputsInfo, name:e.target.value})} />
        <input type="text" placeholder='Телефон' value={inputsInfo.tel} onChange={(e)=>setInputsInfo({...inputsInfo, tel:e.target.value})} />
        <input type="text" placeholder='Email' value={inputsInfo.email} onChange={(e)=>setInputsInfo({...inputsInfo, email:e.target.value})} />
      </div>
      <button onClick={()=>navigate('/success')} >Записаться</button>
    </div>
  )
}

export default Contacts