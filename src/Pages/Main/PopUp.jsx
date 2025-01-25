import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllSemples } from '../../components/API/personSemple/getAllSemples'
import moment from 'moment';
import { nanoid } from 'nanoid'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import styles from './PopUp.module.scss'


const time = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "21:00"
]


const PopUp = ({ day, handlePopUp, setHandlePopUp }) => {



    const [showSemples, setShowSemples] = useState(false);
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ['semples'],
        queryFn: getAllSemples,
    });
    const currentDay = moment(day.date).format('DD.MM.YYYY');





    return (
        <div className={handlePopUp ? styles.popUpOpen : styles.popUpClose}>
            <div className={styles.popUpWrapper}>
                <button onClick={() => setHandlePopUp(false)}>Закрой Бистра</button>
                <h1>{currentDay}</h1>
                <h4>{day.dayOfWeek}</h4>
                {day.data && day.data.length > 0 ? (
                    day.data.map(person => (
                        <div className={styles.itemText} key={nanoid()}  >
                            <p className={styles.itemName}>
                                <span className={styles.itemColor} style={{ backgroundColor: person.color }}>{person.namePerson.slice(0, 2)}</span>
                                <span>{person.namePerson}</span>
                            </p>
                            <p className={styles.time}>{person.startTime} - {person.endTime}</p>
                            <p className={styles.itemTimeDiffrance}>{Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))} ч</p>
                            <p>{(Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))) * person.currentRate} руб</p>

                            <div className={styles.button}>
                                <Fab color="info" variant="circular" size="small" aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            </div>
                        </div>
                    ))
                )
                    :
                    <div onClick={() => setShowSemples(!showSemples)} >

                        Добавить
                        {showSemples && <ul className={styles.semleList}>
                            {isLoading ?
                                <p>Loading...</p>
                                :
                                <li>
                                    {data.map((item) => (
                                        <li>
                                            <p className={styles.itemName}>{item.namePerson}</p>
                                            <p className={styles.itemColor} style={{ backgroundColor: item.color }}></p>

                                            <p>{item.startTime} - {item.endTime}</p>
                                            <p>{item.currentRate} руб</p>
                                        </li>

                                    ))}
                                </li>
                            }
                        </ul>}

                    </div>

                }

            </div>
        </div>
    )
}

export default PopUp