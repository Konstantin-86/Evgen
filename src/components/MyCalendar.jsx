import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PVZ1 = [
  {
      "22.01.2025": [
          {
              "id": 1,
              "namePerson": "Иван Иванов",
              "startTime": "09:00",
              "endTime": "17:00",
              "currentRate": 1000
          },
          {
              "id": 2,
              "namePerson": "Петр Петров",
              "startTime": "10:00",
              "endTime": "18:00",
              "currentRate": 1200
          }
      ]
  },
  {
      "25.01.2025": [
          {
              "id": 1,
              "namePerson": "Иван Иванов",
              "startTime": "09:00",
              "endTime": "17:00",
              "currentRate": 1000
          },
          {
              "id": 2,
              "namePerson": "Петр Петров",
              "startTime": "10:00",
              "endTime": "18:00",
              "currentRate": 1200
          }
      ]
  }
]

const MyCalendar = ({}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fullWeekArray, setFullWeekArray] = useState([]); // Для сохранения на сервер
  const [displayWeekArray, setDisplayWeekArray] = useState([]); // Для отображения

  const [getCurrentWeek, setGetCurrentWeek] = useState([]); 
  const [PVZ1Data, setPVZ1Data] = useState(PVZ1)
 
  const callbackCalendar = (data) => {
    const newArray = data.map((date) => {
      const matchingData = PVZ1Data.find((item) => {
      return item[date]
      });
      if (matchingData) {
        return {
          [date]: matchingData[date], 
        };
      }
      return {
        [date]: [],
      };
    });
    console.log(newArray);
    
    setGetCurrentWeek(newArray)
  }

  
  const getWeekArrays = (date) => {
    const dayOfWeek = date.getDay();
    const startOfWeekDate = new Date(date);
    startOfWeekDate.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const fullWeek = [];
    const displayWeek = [];

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0'); // День с ведущим нулем
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц с ведущим нулем
      const year = date.getFullYear(); // Год
      return `${day}.${month}.${year}`; // Формат DD.MM.YYYY
    };

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeekDate);
      currentDate.setDate(startOfWeekDate.getDate() + i);

      // Полный формат для сохранения на сервер
      fullWeek.push({
        date: formatDate(currentDate), 
      });

      // Сокращенный формат для отображения
      displayWeek.push({
        date: String(currentDate.getDate()).padStart(2, '0'), // День с ведущим нулем
        dayOfWeek: currentDate.toLocaleDateString('ru-RU', { weekday: 'short' }).replace('.', ''), // "Пн", "Вт" и т.д.
      });
    }

    return { fullWeek, displayWeek };
  };

  // При загрузке страницы устанавливаем текущую неделю
  useEffect(() => {
    const { fullWeek, displayWeek } = getWeekArrays(new Date());
    setFullWeekArray(fullWeek);
    setDisplayWeekArray(displayWeek);
    const sortArray = fullWeek.map(item => item.date)
     /* callbackCalendar(sortArray ) */
  }, []);

  // Обработчик изменения даты в календаре
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const { fullWeek, displayWeek } = getWeekArrays(date);
    setFullWeekArray(fullWeek);
    setDisplayWeekArray(displayWeek);
    const sortArray = fullWeek.map(item => item.date)
     callbackCalendar(sortArray )
  };

  return (
    <div>
      <h1>Выберите дату</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />

      <h2>Неделя (для отображения):</h2>
      <ul>
        {displayWeekArray.map((day, index) => (
          <li key={index}>
            {day.date} - {day.dayOfWeek}
          </li>
        ))}
      </ul>

      <h2>Неделя (для сохранения на сервер):</h2>
      <ul>
        {fullWeekArray.map((day, index) => (
          <li key={index}>{day.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendar;