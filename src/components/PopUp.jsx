import { useState, useEffect } from 'react'
import moment from 'moment';
import { nanoid } from 'nanoid'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../styles/PopUp.module.scss'


const time = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "21:00"
]


const PopUp = ({ day, handlePopUp, setHandlePopUp }) => {
    console.log(day);

    const currentDay = moment(day.date).format('DD.MM.YYYY');





    return (
        <div className={handlePopUp ? styles.popUpOpen : styles.popUpClose}>
            <div className={styles.popUpWrapper}>
                <button onClick={() => setHandlePopUp(false)}>Закрой Бистра</button>
                <h1>{currentDay}</h1>
                <h4>{day.dayOfWeek}</h4>
                {day?.data ? (
                    day.data.map(person => (
                        <div className={styles.itemText} key={nanoid()}  >
                            <p className={styles.itemName}>
                                <span className={styles.itemColor} style={{ backgroundColor: person.color }}>{person.namePerson.slice(0, 2)}</span>
                                <span>{person.namePerson}</span>
                            </p>
                            <p сlassName={styles.time}>{person.startTime} - {person.endTime}</p>
                            <p сlassName={styles.itemTimeDiffrance}>{Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))} ч</p>
                            <p>{(Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))) * person.currentRate} руб</p>

                            <button className={styles.button}>
                                <Fab color="info" variant="circular" size="small" aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            </button>
                        </div>
                    ))
                )
                    :
                    <button>Добавить</button>}

            </div>
        </div>
    )
}

export default PopUp