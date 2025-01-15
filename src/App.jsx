import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { nanoid } from 'nanoid';
import ItemList from './components/ItemList';
import PopUp from './components/PopUp';
import 'react-calendar/dist/Calendar.css';
import './App.css'
import axios from 'axios';

const DATA = [
  {
    "id": 1,
    "day": "11.01.2025",
    "personName": "Василий Васильев",
    "startTime": "09:00",
    "endTime": "12:00"
  },
  {
    "id": 2,
    "day": "11.01.2025",
    "personName": "Иван Иванов",
    "startTime": "19:00",
    "endTime": "21:00"
  },
  {
    "id": 3,
    "day": "12.01.2025",
    "personName": "Максим Максимов",
    "startTime": "09:00",
    "endTime": "12:00"
  },
  {
    "id": 4,
    "day": "11.01.2025",
    "personName": "Александр Александров",
    "startTime": "13:00",
    "endTime": "21:00"
  },
  {
    "id": 4,
    "day": "12.01.2025",
    "personName": "Сидор Сидоров",
    "startTime": "13:00",
    "endTime": "21:00"
  },
  {
    "id": 5,
    "day": "10.01.2025",
    "personName": "Сидор Сидоров",
    "startTime": "13:00",
    "endTime": "21:00"
  }
]
const DATA2 = [
  {
    "id": 1,
    "day": "15.01.2025",
    "personName": "Василий Васильев",
    "startTime": "09:00",
    "endTime": "12:00"
  },
  {
    "id": 2,
    "day": "15.01.2025",
    "personName": "Иван Иванов",
    "startTime": "19:00",
    "endTime": "21:00"
  },
  {
    "id": 3,
    "day": "16.01.2025",
    "personName": "Максим Максимов",
    "startTime": "09:00",
    "endTime": "12:00"
  },
  {
    "id": 4,
    "day": "17.01.2025",
    "personName": "Александр Александров",
    "startTime": "13:00",
    "endTime": "21:00"
  },
  {
    "id": 4,
    "day": "18.01.2025",
    "personName": "Сидор Сидоров",
    "startTime": "13:00",
    "endTime": "21:00"
  }
]
const persons = [
  "Иван Иванов",
  "Петр Петров",
  "Сидор Сидоров",
  "Василий Васильев",
  "Максим Максимов",
  "Александр Александров",
  "Дмитрий Дмитриев",
]
const time = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
  "21:00"
]




function App() {
  const [valueCalendar, setValueCalendar] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState([{
    id: 0,
    day: "",
    schedule: [
      {
        personName: "",
        startTime: "",
        endTime: ""
      }
    ]

  }])
  const [PVZvalue, setPVZvalue] = useState([])
  const [PVZcheck, setPVZcheck] = useState("PVZ2")

  useEffect(() => {
    axios.get(`https://694548aefb424dc0.mokky.dev/${PVZcheck}`).then((res) => {
      setPVZvalue(res.data)
    })
    console.log("UseEffect сработал");
  }, [PVZcheck])
  console.log(PVZvalue);


  useEffect(() => {
    getWeekArray();
  }, [valueCalendar, PVZcheck, PVZvalue])

  const getCurrentWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)); // Понедельник
    const endOfWeek = new Date(date);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Воскресенье
    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getCurrentWeekRange(valueCalendar);


  const getWeekArray = () => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      const formattedDate = currentDay.toLocaleDateString('ru-RU');
      week.push({ day: formattedDate });
    }
    const combinedData = week.map((dayInfo) => {

      const matches = PVZvalue.filter((data) => data.day === dayInfo.day);
      if (matches.length > 0) {
        return {
          ...dayInfo,
          schedule: matches
        };
      }
      return dayInfo;
    });

    setCurrentWeek(combinedData);
  }
  const handleDate = (newDate) => {
    setValueCalendar(newDate)
    getWeekArray();
  }


  const [dateForAdd, setDateForAdd] = useState("")
  const [personForAdd, setPersonForAdd] = useState("")
  const [startTimeForAdd, setStartTimeForAdd] = useState("")
  const [endTimeForAdd, setEndTimeForAdd] = useState("")
  const [titlePopup, setTitlePopup] = useState("")
  const [idPerson, setIdPerson] = useState(0)
  const [showPupup, setShowPopup] = useState(false);
  const [titlePopUpButton, setTitlePopUpButton] = useState("Добавить")

  const editTask = (schedule) => {
    setTitlePopup(schedule.day)
    setPersonForAdd(schedule.personName)
    setStartTimeForAdd(schedule.startTime)
    setEndTimeForAdd(schedule.endTime)
    setIdPerson(schedule.id)
    setShowPopup(true)
    setTitlePopUpButton("Изменить")

  }

  const changeSomeTask = () => {
    if (titlePopUpButton === "Изменить") {
      const newWeek = currentWeek.map((day) => {
        if (day.schedule) {
          day.schedule.map((schedule) => {
            if (schedule.id === idPerson) {
              schedule.personName = personForAdd
              schedule.startTime = startTimeForAdd
              schedule.endTime = endTimeForAdd
            }
            return schedule
          })
          return day
        }
        return day
      })
      setCurrentWeek(newWeek)
      setShowPopup(false)
    } else {
      const maxId = Math.max(...DATA.map((item) => item.id) || 0);
      axios.post(`https://694548aefb424dc0.mokky.dev/${PVZcheck}`, {
        "id": maxId + 1,
        "day": dateForAdd,
        "personName": personForAdd,
        "startTime": startTimeForAdd,
        "endTime": endTimeForAdd
      }).then((res) => {
        alert("Запись добавлена")
        setPVZvalue([...PVZvalue, res.data]);

      })
      setShowPopup(!showPupup)
      getWeekArray()
    }
  }

  const addTask = (day) => {
    setTitlePopUpButton("Добавить")
    setShowPopup(true)
    setTitlePopup(day)
    setDateForAdd(day)
    setPersonForAdd("Иван Иванов")
    setStartTimeForAdd("09:00")
    setEndTimeForAdd("21:00")
    setShowPopup(true)
  }
  const deleteTask = () => {
    const newWeek = currentWeek.map((day) => {
      if (day.schedule) {
        day.schedule = day.schedule.filter((schedule) => schedule.id !== idPerson)
        return day
      }
      return day
    })

    axios.delete(`https://694548aefb424dc0.mokky.dev/${PVZcheck}/${idPerson}`).then((res) => {
      alert("Запись удалена")
      setCurrentWeek(newWeek)
      setShowPopup(false)
    }).catch((err) => {
      alert("Запись не удалена")
      console.log(err);

    })
  }


  const handlePVZ = (e) => {
    if (e.target.value === "PVZ1") {
      setPVZvalue(DATA)
    } else {
      setPVZvalue(DATA2)
    }
    setPVZcheck(e.target.value)
    getWeekArray()
  }


  return (
    <div className="container">
      <>
        <Calendar value={valueCalendar} onChange={handleDate} locale='ru-RU' />
        <div className="PVZ-wrapper">
          <label htmlFor="PVZ1"><input type="radio" id="PVZ1" name="PVZ" checked={PVZcheck === 'PVZ1'} value="PVZ1" onChange={handlePVZ} />ПВЗ № 1</label>
          <label htmlFor="PVZ2"><input type="radio" id="PVZ2" name="PVZ" checked={PVZcheck === 'PVZ2'} value="PVZ2" onChange={handlePVZ} />ПВЗ № 2</label>
        </div>
        <div className={showPupup ? "open" : "close"}>

          <div className="popup" >
            <button className="closeBtn" onClick={() => setShowPopup(false)}>X</button>
            <h5>{titlePopup}</h5>

            <label htmlFor="person-info">Работник</label>

            <select id="person-info" value={personForAdd} onChange={(e) => setPersonForAdd(e.target.value)} >
              {persons.map((person) => <option key={nanoid()}  >{person}</option>)}
            </select>

            <label htmlFor="time-for-start">Время начала</label>
            <select name="pets" id="person-info" value={startTimeForAdd} onChange={(e) => setStartTimeForAdd(e.target.value)}>
              {time.map((time) => <option key={nanoid()} value={time} >{time}</option>)}
            </select>

            <label htmlFor="time-for-start">Время конца</label>
            <select name="pets" id="person-info" value={endTimeForAdd} onChange={(e) => setEndTimeForAdd(e.target.value)}>
              {time.map((time) => <option key={nanoid()} value={time} >{time}</option>)}
            </select>
            <div className="button-wrap">
              <button className='button' onClick={changeSomeTask}>{titlePopUpButton}</button>
              <button className={titlePopUpButton === "Изменить" ? "delete-button button" : "hidden-button"} onClick={deleteTask}>Удалить</button>
            </div>

          </div>
        </div>
        {currentWeek.map((day) => <ItemList key={nanoid()} day={day} editTask={editTask} addTask={addTask} />)}
      </>
    </div>

  )
}

export default App
