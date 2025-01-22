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
import PersonSemples from './components/PersonSemples';
import MyCalendar from './components/MyCalendar';


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
const personSemplesAPI = [
  {
    id: 1,
    namePerson: "Илья",
    startTime: "09:00",
    endTime: "15:00",
    bidRubles: 100,
    color: "#33c926c9"
  },
  {
    id: 2,
    namePerson: "Кирилл",
    startTime: "16:00",
    endTime: "21:00",
    bidRubles: 200,
    color: "#c92626c9"
  },
  {
    id: 3,
    namePerson: "Васька",
    startTime: "09:00",
    endTime: "21:00",
    bidRubles: 300,
    color: "#26c9c9"
  },
  {
    id: 4,
    namePerson: "Илья",
    startTime: "09:00",
    endTime: "21:00",
    bidRubles: 200,
    color: "#26c926c9"
  },
]





function App() {






  return (
    <div className="container">
      <>
        <MyCalendar />


      </>
    </div>

  )
}

export default App
