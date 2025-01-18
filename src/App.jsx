import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { nanoid } from 'nanoid';
import ItemList from './components/ItemList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import axios from 'axios';

/* const DATA = [
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
] */
const persons = [

  "Иван Иванов",
  "Петр Петров",
  "Сидор Сидоров",
  "Василий Васильев",
  "Максим Максимов",
  "Александр Александров",
  "Дмитрий Дмитриев",
]
const persons2 = [
  {
    "id": 1,
    "namePerson": "Иван Иванов",

  },
  {
    "id": 2,
    "namePerson": "Петр Петров",

  },
  {
    "id": 3,
    "namePerson": "Сидор Сидоров",

  },
  {
    "id": 4,
    "namePerson": "Василий Васильев",

  },
  {
    "id": 5,
    "namePerson": "Александр Александров",

  },
  {
    "id": 6,
    "namePerson": "Дмитрий Дмитриев",

  },
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
  const [PVZdate1, setPVZdate1] = useState([])
  const [PVZdate2, setPVZdate2] = useState([])
  const [persons, setPersons] = useState([])
  const [PVZcheck, setPVZcheck] = useState("PVZ1")

  const [dateForAdd, setDateForAdd] = useState("")
  const [personForAdd, setPersonForAdd] = useState("")
  const [startTimeForAdd, setStartTimeForAdd] = useState("")
  const [endTimeForAdd, setEndTimeForAdd] = useState("")
  const [titlePopup, setTitlePopup] = useState("")
  const [idPerson, setIdPerson] = useState(0)
  const [showPupup, setShowPopup] = useState(false);
  const [titlePopUpButton, setTitlePopUpButton] = useState("Добавить")

  useEffect(() => {
    axios.get(`https://694548aefb424dc0.mokky.dev/PVZ1`).then((res) => {
      setPVZdate1(res.data)
    }).catch((err) => {
      alert("Проблема с загрузкой данных")
      console.log(err);
    })
    axios.get(`https://694548aefb424dc0.mokky.dev/PVZ2`).then((res) => {
      setPVZdate2(res.data)
    }).catch((err) => {
      alert("Проблема с загрузкой данных")
      console.log(err);
    })
    axios.get("https://694548aefb424dc0.mokky.dev/persons").then((res) => {
      setPersons(res.data)
    }).catch((err) => {
      alert("Проблема с загрузкой данных")
      console.log(err);
    })
    console.log("UseEffect сработал");
  }, [])


  useEffect(() => {
    getWeekArray();
  }, [valueCalendar, PVZcheck, PVZdate1, PVZdate2])

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
    const PVZvalue = PVZcheck === "PVZ1" ? PVZdate1 : PVZdate2

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




  const editTask = (schedule) => {
    console.log(schedule);

    setDateForAdd(schedule.day)
    setTitlePopup(schedule.day)
    setPersonForAdd(schedule.personName)
    setStartTimeForAdd(schedule.startTime)
    setEndTimeForAdd(schedule.endTime)
    setIdPerson(schedule.id)
    setShowPopup(true)
    setTitlePopUpButton("Изменить")

  }

  const changeSomeTask = () => {
    const PVZvalue = PVZcheck === "PVZ1" ? PVZdate1 : PVZdate2
    const maxId = PVZvalue.length
      ?
      Math.max(...PVZvalue.map((item) => item.id))
      : 0;
    const newItem = {
      id: maxId + 1,
      day: dateForAdd,
      personName: personForAdd,
      startTime: startTimeForAdd,
      endTime: endTimeForAdd
    }
    console.log(PVZvalue);

    if (titlePopUpButton === "Изменить") {
      axios.patch(`https://694548aefb424dc0.mokky.dev/${PVZcheck}/${idPerson}`, {
        personName: personForAdd,
        startTime: startTimeForAdd,
        endTime: endTimeForAdd
      }).then((res) => {
        alert("Запись Измененна")
        const newItem = {
          id: idPerson,
          day: dateForAdd,
          personName: personForAdd,
          startTime: startTimeForAdd,
          endTime: endTimeForAdd
        }
        if (PVZcheck === "PVZ1") {
          const newDate = PVZvalue.filter((item) => item.id !== idPerson)
          setPVZdate1([...newDate, newItem])
        } else {
          setPVZdate2([...PVZdate2, newItem])
        }
        setShowPopup(!showPupup)
      }).catch((err) => {
        alert("Запись не изменена")
        console.log(err);
      })
    } else {

      axios.post(`https://694548aefb424dc0.mokky.dev/${PVZcheck}`, newItem).then((res) => {
        alert("Запись добавлена")


        if (PVZcheck === "PVZ1") {
          setPVZdate1([...PVZvalue, newItem])
        } else {
          setPVZdate2([...PVZvalue, newItem])
        }
        setShowPopup(!showPupup)
      }).catch((err) => {
        alert("Запись не добавлена")
        console.log(err);
      })

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
    const PVZvalue = PVZcheck === "PVZ1" ? PVZdate1 : PVZdate2
    const newWeek = currentWeek.map((day) => {
      if (day.schedule) {
        day.schedule = day.schedule.filter((schedule) => schedule.id !== idPerson)
        return day
      }
      return day
    })

    axios.delete(`https://694548aefb424dc0.mokky.dev/${PVZcheck}/${idPerson}`).then((res) => {
      alert("Запись удалена")
      if (PVZcheck === "PVZ1") {
        setPVZdate1(PVZvalue.filter((item) => item.id !== idPerson))
      } else {
        setPVZdate2(PVZvalue.filter((item) => item.id !== idPerson))
      }
      setShowPopup(false)
    }).catch((err) => {
      alert("Запись не удалена")
      console.log(err);

    })
  }


  const handlePVZ = (e) => {

    setPVZcheck(e.target.value)
    getWeekArray()
  }


  /*   ///////////////////// */

  const [newPerson, setNewPerson] = useState("")
  const [showPersons, setShowPersons] = useState(true)
  const deletePerson = (id) => {
    axios.delete(`https://694548aefb424dc0.mokky.dev/persons/${id}`).then((res) => {
      alert("Персонаж удален")
      setPersons(persons.filter((person) => person.id !== id))
      setNewPerson("")
    }).catch((err) => {
      alert("Персонаж не удален")
      console.log(err);
    })
  }
  const addPerson = () => {
    if (newPerson === "") {
      alert("Введите имя персонажа")
      return
    }
    const maxId = persons.length
      ?
      Math.max(...persons.map((item) => item.id))
      : 0;
    const newItem = {
      id: maxId + 1,
      namePerson: newPerson
    }
    axios.post(`https://694548aefb424dc0.mokky.dev/persons`, newItem).then((res) => {
      alert("Персонаж добавлен")
      setPersons([...persons, newItem])
      setNewPerson("")
    }).catch((err) => {
      alert("Персонаж не добавлен")
      console.log(err);
    })
  }
  /*   ///////////////////// */
  return (
    <div className="container">
      <>
        <Calendar value={valueCalendar} onChange={handleDate} locale='ru-RU' />
        <div className="personWrapper">
          <h4 onClick={() => setShowPersons(!showPersons)}>Список работников</h4>
          <ul className={showPersons ? "personsList" : "personsList active"}>
            {persons.length && persons.map((person) => (
              <li key={person.namePerson}>{person.namePerson} <Button size='small' variant="outlined" color='error' onClick={() => deletePerson(person.id)}>Удалить</Button></li>
            ))}
          </ul>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Имя персонажа" value={newPerson} onChange={(e) => setNewPerson(e.target.value)} variant="outlined" />
          </Box>
          <Button onClick={addPerson} color='primary' variant="contained">Добавить Персонажа</Button>

        </div>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="PVZ1" control={<Radio />} checked={PVZcheck === 'PVZ1'} onChange={handlePVZ} label="ПВЗ № 1" />
            <FormControlLabel value="PVZ2" control={<Radio />} checked={PVZcheck === 'PVZ2'} onChange={handlePVZ} label="ПВЗ № 2" />
          </RadioGroup>
        </FormControl>
        <div className={showPupup ? "open" : "close"}>

          <div className="popup" >
            <h3>{idPerson}</h3>
            <button className="closeBtn" onClick={() => setShowPopup(false)}>X</button>
            <h5>{titlePopup}</h5>

            <label htmlFor="person-info">Работник</label>

            <select id="person-info" value={personForAdd} onChange={(e) => setPersonForAdd(e.target.value)} >
              {persons.map((person) => <option key={nanoid()}  >{person.namePerson}</option>)}
            </select>
            {/*  <Autocomplete
              disablePortal
              options={persons}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Работник" />}
            /> */}

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
        <ul>
          {currentWeek.map((day) => <ItemList key={nanoid()} day={day} editTask={editTask} addTask={addTask} />)}
        </ul>
      </>
    </div>

  )
}

export default App
