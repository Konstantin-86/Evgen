import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPVZ1 } from '../../components/API/PVZ/getPVZ1'
import { getPVZ2 } from '../../components/API/PVZ/getPVZ2'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import getCurrentMonthAndYear from './helpers/getCurrentMonthAndYear.js';

import StatGrafic from './StatGrafic.jsx';

import styles from './Statictics.module.scss'



const Statictics = ({ }) => {
    const [checkPVZ, setCheckPVZ] = useState('');
    const [curMonth, setCurMonth] = useState("")
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [filtredSumArray, setFiltredSumArray] = useState([]);
    const [summarHours, setSummarHours] = useState(0)
    const [summarRubles, setSummarRubles] = useState(0)
console.log(curMonth, "curMonth");

    useEffect(() => {
        const storedValue = sessionStorage.getItem('checkPVZ');
        const checkMonth = sessionStorage.getItem('curMonth');
        if (storedValue) {
          setCheckPVZ(storedValue);
        }else{
          setCheckPVZ('PVZ1');
        }
        if (checkMonth) {
          setCurMonth(checkMonth);
        }else{
          setCurMonth(getCurrentMonthAndYear())
        }
      }, []);

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
        sessionStorage.setItem('checkPVZ', event.target.value);
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

    useEffect(() => {
        if (!isLoadingPVZ1 && !isLoadingPVZ2) {
            const checkPVZValue = checkPVZ === 'PVZ1' ? PVZ1 : PVZ2;
            
            if (checkPVZValue && Array.isArray(checkPVZValue)) {
                const filtredArray = checkPVZValue.filter(item => {
                    return item.date.slice(3, 5) === curMonth.slice(5, 7);
                });
    
                const filtredSumArray = [];
    
                filtredArray.forEach(item => {
                    const end = Number(item.endTime.slice(0, 2));
                    const start = Number(item.startTime.slice(0, 2));
                    const diffrenceTime = end - start;
                    const sum = Number(item.currentRate) * diffrenceTime;
                    const bonusAndFines = sum + Number(item.otherData.bonus) - Number(item.otherData.fines);
                    const existingEntry = filtredSumArray.find(elem => elem.name === item.namePerson);
    
                    if (existingEntry) {
                        existingEntry.hours += diffrenceTime;
                        existingEntry.result += sum;
                        existingEntry.bonus += Number(item.otherData.bonus);
                        existingEntry.fines += Number(item.otherData.fines);
                        existingEntry.finalResult += bonusAndFines;
                       
                    } else {
                        filtredSumArray.push({
                            name: item.namePerson,
                            hours: diffrenceTime,
                            result: sum,
                            bonus: Number(item.otherData.bonus),
                            fines: Number(item.otherData.fines),
                            finalResult: bonusAndFines,
                            color: item.color
                        });
                    }
                });
    
                const sumHours = filtredSumArray.reduce((acc, item) => {
                    return acc + item.hours;
                }, 0);
                setSummarHours(sumHours);
    
                const sumOfRubles = filtredSumArray.reduce((acc, item) => {
                    return acc + item.result + item.bonus - item.fines;
                }, 0);
                setSummarRubles(sumOfRubles);
    
                setFiltredSumArray(filtredSumArray);
            }
        }
    }, [curMonth, checkPVZ, PVZ1, PVZ2, isLoadingPVZ1, isLoadingPVZ2]);

   
    return (
        <div className={styles.statWrap}>
            
            <ToggleButtonGroup
                color='info'
                value={checkPVZ}
                onChange={(event) => handleChange(event)}
                sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    marginBottom: '7px',
                    gap: "15px"
                }
                }
            >
                <ToggleButton sx={getToggleButtonStyles('PVZ1', checkPVZ)} value="PVZ1">ПВЗ №1</ToggleButton>
                <ToggleButton sx={getToggleButtonStyles('PVZ2', checkPVZ)} value="PVZ2">ПВЗ №2</ToggleButton>
            <input className={styles.inptMonth} type="month" value={curMonth} onChange={(e) => {
                setCurMonth(e.target.value);
                sessionStorage.setItem('curMonth', e.target.value);
            }} />
            </ToggleButtonGroup>
            
            <div className={styles.infoWrap}>
            <p>Дней в месяце: {daysInMonth}</p>
            <p>Часов в месяце {daysInMonth * 12}</p>
            {filtredSumArray.length ?
            <div className={styles.resultTable}>
                <p>Часов по факту: {summarHours}</p>
                <p>Всего сумма {summarRubles}руб</p>
            </div>
            : null}
            </div>

            <StatGrafic filtredSumArray={filtredSumArray}/>
           
            <div className={styles.tableWrap}>
            {filtredSumArray.length ? 
                filtredSumArray.map((item, index) => (
                    <div className={styles.statTable} key={index}>
                        <div className={styles.tableItem}>
                            <p className={styles.name}>{item.name}</p>
                            <p className={styles.hours}>{item.hours}ч</p>
                            <div className={styles.itemMoney}>
                                <p className={styles.activeRes }>{item.result}</p>
                                <p className={styles.activeFines}>{item.fines}</p>
                                <p className={styles.activeBonus}>{item.bonus}</p>
                                <p className={styles.activeFinalRes}>{item.finalResult}</p>
                            </div>
                        </div>
                    </div>
                )) : <h5>нет данных</h5>
            }
           
             <div className={styles.explaneTable}>
                <p className={styles.explaneResult}>Общий заработк без учета бонусов и штрафов</p>
                <p className={styles.explaneFines}>Штрафы</p>
                <p className={styles.explaneBonus}>Бонусы</p>
                <p className={styles.explaneFinalResult}>Итого с учетом бонусов и штрафов</p>
            </div>
              </div>
           
        </div>
    )
}
export default Statictics;