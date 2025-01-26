import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

import { useQuery } from '@tanstack/react-query';
import { getPVZ1 } from '../../components/API/PVZ/getPVZ1';

import styles from './Statictics.module.scss'

const Statictics = ({ }) => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate);


    const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
        queryKey: ['PVZ1'],
        queryFn: getPVZ1,
    });
    useEffect(() => {
        if (PVZ1 && !isLoadingPVZ1) {
            setData(PVZ1);
        }
    }, [PVZ1, isLoadingPVZ1]);

    const calculateStatistics = (data) => {
        const statistics = {};

        data.forEach(day => {
            const date = Object.keys(day)[0];
            day[date].forEach(person => {
                const name = person.namePerson;
                const startTime = new Date(`1970-01-01T${person.startTime}:00`);
                const endTime = new Date(`1970-01-01T${person.endTime}:00`);
                const hoursWorked = (endTime - startTime) / (1000 * 60 * 60);
                const moneyEarned = hoursWorked * person.currentRate;

                if (!statistics[name]) {
                    statistics[name] = {
                        totalHours: 0,
                        totalMoney: 0
                    };
                }

                statistics[name].totalHours += hoursWorked;
                statistics[name].totalMoney += moneyEarned;
            });
        });

        return statistics;
    };

    const statistics = calculateStatistics(data);
    console.log(statistics);



    return (
        <>
            {isLoadingPVZ1 ?
                <div>Loading...</div>
                :
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        locale={ru}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Выберите дату"
                    />
                    <p>1</p>
                </div>


            }
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Количество часов</th>
                        <th>Количество денег</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(statistics).map(name => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{statistics[name].totalHours.toFixed(2)}</td>
                            <td>{statistics[name].totalMoney.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}
export default Statictics;