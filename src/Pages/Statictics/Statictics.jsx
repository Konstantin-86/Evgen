import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPVZ1 } from '../../components/API/PVZ/getPVZ1'
import { getPVZ2 } from '../../components/API/PVZ/getPVZ2'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import getCurrentMonthAndYear from './helpers/getCurrentMonthAndYear.js';
import styles from './Statictics.module.scss'



const Statictics = ({ }) => {
    const [checkPVZ, setCheckPVZ] = useState('PVZ1');
    const [curMonth, setCurMonth] = useState(getCurrentMonthAndYear())
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [filtredSumArray, setFiltredSumArray] = useState([]);



    const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
        queryKey: ['PVZ1'],
        queryFn: getPVZ1,
    });

    const { data: PVZ2, isLoading: isLoadingPVZ2 } = useQuery({
        queryKey: ['PVZ2'],
        queryFn: getPVZ2,
    });
    const handleChange = (event) => {
        setCheckPVZ(event.target.value);
    };
    const getToggleButtonStyles = (value, checkPVZ) => ({
        backgroundColor: checkPVZ === value ? '#3a393a' : '#1f1e1f',
        color: checkPVZ === value ? '#f1f0f0' : '#7e7b7b',
        '&:hover': {
            backgroundColor: checkPVZ === value ? '#388e3c' : '#bdbdbd',
        },
    });

    useEffect(() => {
        const [year, month] = curMonth.split('-').map(Number);
        const nextMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(nextMonth - 1);
        setDaysInMonth(lastDayOfMonth.getDate())

    }, [curMonth]);

    const filtredByMonth = () => {
        const checkPVZValue = checkPVZ === 'PVZ1' ? PVZ1 : PVZ2
        const filtredArray = checkPVZValue.filter(item => {
            return item.date.slice(3, 5) === curMonth.slice(5, 7)
        })
        console.log(filtredArray);



        const allHours = checkPVZValue.filter(item => {
            const end = Number(item.endTime.slice(0, 2))
            const start = Number(item.startTime.slice(0, 2))
            const diffrenceTime = end - start
            const sum = Number(item.currentRate) * diffrenceTime
            const bonusAndFines = sum + Number(item.otherData.bonus) - Number(item.otherData.fines)

            filtredSumArray.find(elem => {
                if (elem.name === item.namePerson) {
                    elem.hours += diffrenceTime
                    elem.result += sum
                    elem.fines += Number(item.otherData.fines)
                    elem.bonus += Number(item.otherData.bonus)
                    elem.finalResult += bonusAndFines
                } else {
                    const newItem = {
                        name: item.namePerson,
                        hours: diffrenceTime,
                        result: sum,
                        fines: Number(item.otherData.fines),
                        bonus: Number(item.otherData.bonus),
                        finalResult: bonusAndFines
                    }
                    setFiltredSumArray([...filtredSumArray, newItem])
                }
            })
            if (filtredSumArray.length === 0) {
                const newItem = {
                    name: item.namePerson,
                    hours: diffrenceTime,
                    result: sum,
                    fines: Number(item.otherData.fines),
                    bonus: Number(item.otherData.bonus),
                    finalResult: bonusAndFines
                }
                setFiltredSumArray([...filtredSumArray, newItem])
            }

            console.log("filtredSumArray", filtredSumArray);
            console.log("date", item.date, "bonusAndFines", bonusAndFines);

        })

    }

    return (
        <>
            <ToggleButtonGroup
                color='info'
                value={checkPVZ}
                onChange={(event) => handleChange(event)}
                sx={{
                    backgroundColor: '#363636',
                    color: 'white',
                    marginBottom: '7px',
                }
                }
            >
                <ToggleButton sx={getToggleButtonStyles('PVZ1', checkPVZ)} value="PVZ1">ПВЗ №1</ToggleButton>
                <ToggleButton sx={getToggleButtonStyles('PVZ2', checkPVZ)} value="PVZ2">ПВЗ №2</ToggleButton>
            </ToggleButtonGroup>
            <input type="month" value={curMonth} onChange={(e) => setCurMonth(e.target.value)} />
            <button onClick={filtredByMonth}>Показать</button>
            <p>Дней в месяце: {daysInMonth}</p>
            <p>Часов в месяце</p>
            <div className={styles.statTable}>
                <div className={styles.tableItem}>
                    <p>Name</p>
                    <p>Колво часов</p>
                    <div className={styles.itemMoney}>
                        <p>Заработал</p>
                        <p>штраф</p>
                        <p>премия</p>
                        <p>итого</p>
                    </div>
                </div>
                <div className={styles.tableItem}>
                    <p>Name</p>
                    <p>Колво часов</p>
                    <div className={styles.itemMoney}>
                        <p>Заработал</p>
                        <p>штраф</p>
                        <p>премия</p>
                    </div>
                </div>
                <div className={styles.tableItem}>
                    <p>Name</p>
                    <p>Колво часов</p>
                    <div className={styles.itemMoney}>
                        <p>Заработал</p>
                        <p>штраф</p>
                        <p>премия</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Statictics;