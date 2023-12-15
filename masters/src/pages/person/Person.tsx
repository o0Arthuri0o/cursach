import React, { useEffect, useState } from 'react'
import './Person.css'
const Person = () => {
  const token = localStorage.getItem('token')
  const masterInfoExemple = {id:1, name:'Виктор'}
  


  //добавление новой услуги и отрисовка услуг
  const [newFeature, setNewFeature] = useState('')
  const [featureList, setFeatureList] = useState([{title:'Стрижка классическая'}, {title:'Уход за бородой'}, {title:'Детская стрижка'}])
  // useEffect(()=>{
  //   const fetchFeature = async() => {
  //     try{
            //поменять url
  //       const response = await fetch('', {method:'GET', headers{'Content-type': 'application/json; charset=UTF-8', token:`${token}`}})
  //       const data = await response.json()

  //       setFeatureList(data)
  //     }
  //     catch(e) {
  //       console.log(e)
  //     }
  //    }
  //   fetchFeature()
  // }, [newFeature])


  //modal
  const [isOpen, setIsOpen] = useState(false)
  const [textNewFeature, setTextNewFeature] = useState('')

  const addNewFeature = () => {

    setNewFeature(textNewFeature)
    setTextNewFeature('')
    setIsOpen(false)

    const addFeatureFetch = async(title: string) => {
      try{
        const response = await fetch('', {
          method: 'PUT',
          body: JSON.stringify(title),
          headers:{'Content-type': 'application/json; charset=UTF-8', token:`${token}`}
        })
      }
      catch(e){
        console.log(e)
      }
    }
    addFeatureFetch(textNewFeature)
  }

  const deleteFeature = (title:string) => {
    const newFeatureList = featureList.filter(item => item.title != title)
    setFeatureList(newFeatureList)
    // const deleteListFetch = async(title: string) => {
    //   try{
    //     const response = await fetch('', {
    //       method: 'POST',
    //       body: JSON.stringify(title),
    //       headers:{'Content-type': 'application/json; charset=UTF-8', token:`${token}`}
    //     })
    //     const data = await response.json() //надо узнать, передал ли новый список
    //    // setFeatureList(data)
    //   }
        
      
    //   catch(e){
    //     console.log(e)
    //   }
    // }
    // deleteFeature(title)
  }




  //Время и дата
  const time = {
    morning: [['10:00', 'free'],['11:00', 'free'],['12:00', 'free']],
    midday: [['13:00', 'busy'],['14:00', 'free'],['15:00', 'busy'],['16:00', 'free'],['17:00', 'free']],
    evening: [['18:00', 'free'],['19:00', 'free'],['20:00', 'free'],['21:00', 'free'],['22:00', 'free']]
  }

  const today = new Date().toLocaleDateString().split('.').reverse().join('-');
  const [selectedDate, setSelectedDate] = useState(today)
  const [timeTrue, setTimeTrue] = useState<any>()



  useEffect(()=>{
    const fetchTime = async() => {
      try{
        const response = await fetch('', {
          method:'POST',
          body:JSON.stringify(selectedDate),
          headers:{token:`${token}`}
        })
        const data = await response.json()
        if(data.morning.length) setTimeTrue(data)
        else setTimeTrue(time)
        
      }
      catch(e) {
        console.log(e)
      }
    }


  }, [selectedDate])
  

  return (
    <div className='person-app' >

      <div className={isOpen ? 'modal-wrapper active': 'modal-wrapper'}>
        <div className='modal-window' >
          <input type='text' value={textNewFeature} onChange={(e) => setTextNewFeature(e.target.value)} />
          <div className='btn-wrapper'>
            <div className='feature-delete delete-btn' onClick={()=>setIsOpen(false)} >Отмена</div>
            <div className='add-btn' onClick={() => addNewFeature()} >Добавить</div>
          </div>
        </div>
      </div>

      <p>Мастер:{masterInfoExemple.name}</p>
      <div className='feature-wrapper'>
        <button className='feature-add' onClick={()=>setIsOpen(prev=>!prev)} >Добавить услугу</button>
        <div className='feature-list'>
          {featureList.map(feature => 
            <div className='feature'>
              <p className='feature-text' >{feature.title}</p>
              <div key={feature.title} className='feature-delete' onClick={()=> deleteFeature(feature.title)} >Удалить</div>
            </div>
            )}
        </div>
      </div>

      <input type='date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <div className='freeTime'>
                <div className='partOfDay'>
                    <p>Утро</p>
                    <div className='timeWrapper'>
                    {time.morning.map(slot => {
                      const [hour, switcH] = slot
                       return <div className={switcH === 'free' ? 'free':'busy'}>{hour}</div>
                    })}
                    </div>
                
                
                </div>
                <div className='partOfDay'>
                    <p>День</p>
                    <div className='timeWrapper' >
                    {time.midday.map(slot => {
                      const [hour, switcH] = slot
                       return <div className={switcH === 'free' ? 'free':'busy'}>{hour}</div>
                    })}
                    </div>
                
                </div>
                <div className='partOfDay'>
                    <p>Вечер</p>
                    <div className='timeWrapper' >
                    {time.evening.map(slot => {
                      const [hour, switcH] = slot
                       return <div className={switcH === 'free' ? 'free':'busy'}>{hour}</div>
                    })}
                    </div>
                
                </div>
            </div>

    </div>
  )
}

export default Person