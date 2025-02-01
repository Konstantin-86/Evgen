import { useState, useEffect } from 'react'

import { PieChart, Pie, Cell, Legend } from 'recharts';

import { Alert } from '@mui/material'
import style from './Settings.module.scss'
import axios from 'axios';

const Settings = () => {
    const [showAlert, setShowAlert] = useState(true);

    // Функция для закрытия Alert
    const handleClose = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                handleClose();
            }, 2000);

        }
    }, [showAlert]);
    const value = 50;
    const data = [
        { name: 'Completed', value: value },
        { name: 'Remaining', value: 100 - value },
    ];

    const COLORS = ['#00C49F', '#FF8042'];
    const generateDateRange = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            dates.push(new Date(currentDate).toLocaleDateString('ru-RU'));
            currentDate.setDate(currentDate.getDate() + 1); // Переход к следующему дню
        }

        return dates;
    };

    const generateRandomData = () => {
        const names = ["Иван Иванов", "Петр Петров", "Жирный боров", "Rjcync", "Алексей Алексеев"];
        const colors = ["#33c926c9", "#ff5733", "#3357ff", "#c933ff", "#33fff5"];
        const startDates = generateDateRange("2025-01-28", "2025-02-10");
        const data = [];

        startDates.forEach((date) => {
            const dayData = [];
            const numberOfEntries = Math.floor(Math.random() * 4) + 1; // От 1 до 4 записей на день

            for (let i = 0; i < numberOfEntries; i++) {
                const randomName = names[Math.floor(Math.random() * names.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const randomStartTime = `${Math.floor(Math.random() * 3) + 9}:00`; // С 9:00 до 11:00
                const randomEndTime = `${Math.floor(Math.random() * 3) + 17}:00`; // С 17:00 до 19:00
                const randomRate = Math.floor(Math.random() * 1000) + 500; // От 500 до 1500

                dayData.push({
                    id: i + 1,
                    namePerson: randomName,
                    startTime: randomStartTime,
                    endTime: randomEndTime,
                    currentRate: randomRate,
                    color: randomColor,
                    otherData: {
                        fines: Math.floor(Math.random() * 100), // Случайные штрафы
                        bonus: Math.floor(Math.random() * 200), // Случайные бонусы
                    },
                });
            }

            data.push({ [date]: dayData });
        });

        return data;
    };

    // Пример использования
    const randomData = generateRandomData();
    console.log(JSON.stringify(randomData, null, 2));
    const sendToMokky = () => {
        axios.post('https://694548aefb424dc0.mokky.dev/PVZ1', randomData)
    }

    return (
        <div className={style.settings} >
            <h1>Settings.module.scss</h1>
            <button onClick={sendToMokky}>отправить</button>
            {showAlert && <Alert severity="success" >
                Данные успешно добавлены
            </Alert>}
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    startAngle={90} // Начинаем с верхней точки
                    endAngle={-270} // Заканчиваем на 270 градусов (чтобы круг был заполнен правильно)
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    align="center"
                    verticalAlign="bottom"
                    iconType="circle"
                    payload={data.map((item, index) => ({
                        id: item.name,
                        type: 'circle',
                        value: `${item.name}: ${item.value}%`,
                        color: COLORS[index % COLORS.length],
                    }))}
                />
            </PieChart>

        </div>
    )
}
export default Settings