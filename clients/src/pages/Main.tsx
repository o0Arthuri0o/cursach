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
            
            const response = await fetch('http://localhost:3000/client')
            // укажи тут свой url 
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
  

  
    const [selectedFeature, setSelectedFeature] = useState({title: "", fid: ""})
    const [features, setFeatures] = useState<any[]>([])
    useEffect(() => {
      const fetchFeatures =  async() => {
        try {
          
          const response = await fetch(`http://localhost:3000/feature?id=${selectedMaster.id}`) 
          //укажи тут свой url 
          const data = await response.json()
          console.log(data[0])

          // !!!!!!!!!!!!!!! [0].feature убрать
          setFeatures([...data[0].feature])
        }
        catch(e)
        {
            console.log(e)
        }
      }
      fetchFeatures()
    }, [selectedMaster])
  
  
  
  
    const [selectedDate, setSelectedDate] = useState(today)
    const [selectedTime, setSelectedTime] = useState('')
    const [time, setTime] = useState({morning:[], midday:[], evening:[]})
    useEffect(() => {
      console.log('test')
      const fetchTime =  async() => {
        try {
          // const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedMaster.id}`)
          const response = await fetch(`http://localhost:3000/freetime?id=${selectedMaster.id}&date=${selectedDate}`) 
          //укажи тут свой url 
          const data = await response.json()

          //!!!!!!!!
          if(data.length === 0) {
            console.log('first')
            setTime({morning:[], midday:[], evening:[]})
            return
          }
          const dataOnlyTime = data[0].time
          console.log(dataOnlyTime)
          setTime(dataOnlyTime)
        }
        catch(e)
        {
            console.log(e)
        }
      }
      if(selectedMaster.id && selectedFeature.fid) fetchTime()
      
    },[selectedFeature, selectedDate])
    


   
    const newInfo = () => {
     return ({name:selectedMaster.name, id:selectedMaster.id, title:selectedFeature.title, fid:selectedFeature.fid, date:selectedDate, time:selectedTime})
    }
  

    const navigate = useNavigate()
     return (
      <div className='app'>
        <select className='mastersSelect' name="masters" value={selectedMaster.name} onChange={(e: any) => setSelectedMaster({name:e.target.value, id: e.target.value.split('-')[1]})} >
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
          <select className='featureSelect' name="features" id="features" value={selectedFeature.title} onChange={(e) => setSelectedFeature({title: e.target.value, fid:e.target.value.split('-')[1]})} >
            <option key='333' value="" >--Выберите услугу--</option>
            {features.map((feature) => 
              <option key={feature.id} value={feature.title + '-' + feature.id} >{feature.title}</option>
            )}
          </select>
        }

        {!selectedFeature.title ?
          <input type="date" disabled value={selectedDate} />
          :<input type="date" value={selectedDate} onChange={(e) => {setSelectedDate(e.target.value)}} />

        }
  
        {(time.morning.length || time.midday.length)?
          <div className='freeTime'>
                <div className='partOfDay'>
                    <p>Утро</p>
                    <div className='timeWrapper'>
                    {time.morning.map(time => 
                    <div key={time} className={selectedTime == time ? 'selectedTime' : ''} onClick={(e) => setSelectedTime(e.target.textContent)}>{time}</div>  )}
                    </div>
                
                
                </div>
                <div className='partOfDay'>
                    <p>День</p>
                    <div className='timeWrapper' >
                    {time.midday.map(time => 
                    <div key={time} className={selectedTime == time ? 'selectedTime' : ''} onClick={(e) => setSelectedTime(e.target.textContent)}>{time}</div> )}
                    </div>
                
                </div>
                <div className='partOfDay'>
                    <p>Вечер</p>
                    <div className='timeWrapper' >
                    {time.evening.map(time => 
                    <div key={time} className={selectedTime == time ? 'selectedTime' : ''} onClick={(e) => setSelectedTime(e.target.textContent)}>{time}</div>)}
                    </div>
                
                </div>
            </div>
          : null
        }
       
        <button onClick={()=>{setInfo(newInfo()); navigate('/contact')}} >Записаться</button>
  
      </div>
    )
  }

export default Main