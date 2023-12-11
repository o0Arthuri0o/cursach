import { useState, useEffect } from "react";
import '../App.css'
import { useNavigate } from "react-router-dom";
function Main({setInfo}: any) {  
  
    const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  
    const [selectedMaster, setSelectedMaster] = useState({name: "", id: ""})
    const [masters, setMasters] = useState<any[]>([])
  
    useEffect(()=> {
      const fetchMasters = async() => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            setMasters([...masters, ...data])
        }
        catch(e)
        {
            console.log(e)
        }
        
    }
    fetchMasters()
    }, [])
  
    const [selectedFeature, setSelectedFeature] = useState({title: "", price: "", id: ""})
    const [features, setFeatures] = useState<any[]>([])
    useEffect(() => {
      const fetchData =  async() => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedMaster.id}`)
          const data = await response.json()
          setFeatures([...data])
        }
        catch(e)
        {
            console.log(e)
        }
      }
      fetchData()
    }, [selectedMaster])
  
  
  
  
    const [selectedDate, setSelectedDate] = useState(today)
    const [selectedTime, setSelectedTime] = useState('')
    const timeExample = {morning:['10:00', '11:00'], midday:['13:00','14:00', '15:00', '16:00', '17:00'], evening:['18:00', '20:00', '21:00']}
    const newInfo = () => {
     return ({name:selectedMaster.name, id:selectedMaster.id, title:selectedFeature.title, fid:selectedFeature.id, date:selectedDate, time:selectedTime})
    }
  

    const navigate = useNavigate()
     return (
      <div className='app'>
        <select className='mastersSelect' name="masters" value={selectedMaster.name} onChange={(e) => setSelectedMaster({name:e.target.value, id: e.target.value.split('-')[1]})} >
          <option value="">--Выберите мастера--</option>
          {masters.map((master) => 
            <option key={master.id} value={master.name+'-'+master.id}>{master.name}</option>
          )}
        </select>
  
        {!selectedMaster.name ?
          <select className='featureSelect' name="features" id="features" disabled >
            <option value="">--Выберите услугу--</option>
  
          </select>
          :
          <select className='featureSelect' name="features" id="features" value={selectedFeature.title} onChange={(e) => setSelectedFeature({title: e.target.value, price: e.target.value.split('-')[1], id:e.target.value.split('-')[1]})} >
            <option value="" >--Выберите услугу--</option>
            {features.map((feature) => 
              <option key={feature.id} value={feature.title + '-' + feature.id} >{feature.title}</option>
            )}
          </select>
        }
  
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
  
        {selectedFeature.title?
          <div className='freeTime'>
                <div className='partOfDay'>
                    <p>Утро</p>
                    <div className='timeWrapper'>
                    {timeExample.morning.map(time => 
                    <div key={time} className={selectedTime == time ? 'selectedTime' : ''} onClick={(e) => setSelectedTime(e.target.textContent)}>{time}</div>  )}
                    </div>
                
                
                </div>
                <div className='partOfDay'>
                    <p>День</p>
                    <div className='timeWrapper' >
                    {timeExample.midday.map(time => 
                    <div key={time} className={selectedTime == time ? 'selectedTime' : ''} onClick={(e) => setSelectedTime(e.target.textContent)}>{time}</div> )}
                    </div>
                
                </div>
                <div className='partOfDay'>
                    <p>Вечер</p>
                    <div className='timeWrapper' >
                    {timeExample.evening.map(time => 
                    <div key={time} className={selectedTime == time ? 'selectedTime' : ''} onClick={(e) => setSelectedTime(e.target.textContent)}>{time}</div>)}
                    </div>
                
                </div>
            </div>
          : null
        }
       
        <button onClick={()=>{setInfo(newInfo()), navigate('/contact')}} >Записаться</button>
  
      </div>
    )
  }

export default Main