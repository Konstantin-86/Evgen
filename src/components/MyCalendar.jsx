import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment';
import 'moment/locale/ru';
import ItemList from './ItemList';
import styles from '../styles/MyCalendar.module.scss';

/* const PVZ1 = [
  {
    "22.01.2025": [
      {
        "id": 1,
        "namePerson": "Иван Иванов",
        "startTime": "09:00",
        "endTime": "17:00",
        "currentRate": 1000,
        "color": "#33c926c9",
        "otherData": {
          "fines": 0,
          "bonus": 0,
        }
      },
      {
        "id": 2,
        "namePerson": "Петр Петров",
        "startTime": "10:00",
        "endTime": "18:00",
        "currentRate": 1200,
        "color": "#33c926c9",
        "otherData": {
          "fines": 0,
          "bonus": 0,
        }
      }
    ]
  },
  {
    "25.01.2025": [
      {
        "id": 3,
        "namePerson": "Иван Иванов",
        "startTime": "09:00",
        "endTime": "17:00",
        "currentRate": 1000,
        "color": "#33c926c9",
        "otherData": {
          "fines": 0,
          "bonus": 0,
        }
      },
      {
        "id": 4,
        "namePerson": "Петр Петров",
        "startTime": "10:00",
        "endTime": "18:00",
        "currentRate": 1200,
        "color": "#33c926c9",
        "otherData": {
          "fines": 0,
          "bonus": 0,
        }
      }
    ]
  }
] */

const MyCalendar = ({ }) => {

  const [PVZ1Data, setPVZ1Data] = useState([])

  const [date, setDate] = useState(new Date());
  const [weekData, setWeekData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://694548aefb424dc0.mokky.dev/PVZ1");
        setPVZ1Data(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
    console.log("Запрос на сервер");

  }, [])
  useEffect(() => {
    const startOfWeek = moment(date).startOf('week');
    const endOfWeek = moment(date).endOf('week');
    const weekDays = [];
    let currentDay = startOfWeek;
    while (currentDay <= endOfWeek) {
      const formattedDate = currentDay.format('DD.MM.YYYY');
      const dayData = PVZ1Data.find(item => item[formattedDate]);

      weekDays.push({
        date: currentDay.toDate(),
        dayOfWeek: currentDay.format('dd'),
        data: dayData ? dayData[formattedDate] : []
      });

      currentDay = currentDay.clone().add(1, 'd');
    }

    setWeekData(weekDays);
  }, [date, PVZ1Data]);
  return (

    <div>
      <h2 onClick={() => setShowCalendar(!showCalendar)}>Календарь</h2>
      <Calendar 
      className={showCalendar ? styles.showCalendar : styles.hideCalendar}
        onChange={setDate}
        value={date}
      />
      <div>
        <ItemList weekData={weekData} />
      </div>
    </div>
  );
};

export default MyCalendar;