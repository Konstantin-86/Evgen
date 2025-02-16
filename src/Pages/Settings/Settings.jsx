import { useState, useEffect } from 'react'

import { PieChart, Pie, Cell, Legend } from 'recharts';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";

import { Alert } from '@mui/material'
import style from './Settings.module.scss'
import axios from 'axios';



const Settings = () => {
    const [showAlert, setShowAlert] = useState(true);


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






    return (
        <div className={style.settings} >
            <h1>Settings.module.scss</h1>
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