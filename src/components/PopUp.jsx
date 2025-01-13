import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import styles from '../styles/PopUp.module.scss'


const persons = [
    "Иван Иванов",
    "Петр Петров",
    "Сидор Сидоров",
    "Василий Васильев",
    "Максим Максимов",
    "Александр Александров",
    "Дмитрий Дмитриев",
]
const time = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "21:00"
]


const PopUp = ({ showPupup, setShowPopup, day }) => {

    const [dateForAdd, setDateForAdd] = useState("")
    const [personForAdd, setPersonForAdd] = useState("")
    const [startTimeForAdd, setStartTimeForAdd] = useState("")
    const [endTimeForAdd, setEndTimeForAdd] = useState("")
    const [titlePopup, setTitlePopup] = useState("")


    return (
        <div className={showPupup ? "open" : "close"}>

            <div className="popup" >

                <button className="closeBtn" onClick={() => setShowPopup(false)}  >X</button>

                <label htmlFor="person-info">Работник</label>
                <select name="pets" id="person-info" value={personForAdd} onChange={(e) => setPersonForAdd(e.target.value)} >
                    {persons.map((person) => <option key={nanoid()}  >{person}</option>)}
                </select>

                <label htmlFor="time-for-start">Время начала</label>
                <select name="pets" id="person-info" value={startTimeForAdd} onChange={(e) => setStartTimeForAdd(e.target.value)}>
                    {time.map((time) => <option key={nanoid()} value={time} >{time}</option>)}
                </select>

                <label htmlFor="time-for-start">Время конца</label>
                <select name="pets" id="person-info" value={endTimeForAdd} onChange={(e) => setEndTimeForAdd(e.target.value)}>
                    {time.map((time) => <option key={nanoid()} value={time} >{time}</option>)}
                </select>

                <button>Добавить</button>
            </div>
        </div>
    )
}

export default PopUp