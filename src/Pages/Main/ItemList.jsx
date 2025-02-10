import { useState } from 'react'
import moment from 'moment';
import { nanoid } from 'nanoid';
import style from './ItemList.module.scss'
import PopUp from './PopUp';


const ItemList = ({ currentWeek, callBackNewEvent }) => {

    const [currentDay, setCurrentDay] = useState([]);
    const [handlePopUp, setHandlePopUp] = useState(false);


    const popUp = (day) => {
        setCurrentDay(day);
        setHandlePopUp(true);
    }

    return (

        <ul className={style.itemList}>
            {currentWeek.length && currentWeek.map((day) => (
                <li key={nanoid()}>
                    <p className={style.dayOfWeek}>{day.date}</p>
                    {day.id ?
                        <div>
                            <p className={style.startTime}>{day.startTime}</p>
                            <p className={style.namePerson}>{day.namePerson}</p>
                            <p className={style.itemColor} style={{ backgroundColor: day.color }} >{day.namePerson.slice(0, 2)}</p>
                            <p>{Number(day.endTime.slice(0, 2)) - Number(day.startTime.slice(0, 2))}ч </p>
                        </div>
                        :
                        <div>нет данных</div>
                    }
                </li>
            ))}
            <PopUp day={currentDay} handlePopUp={handlePopUp} setHandlePopUp={setHandlePopUp} callBackNewEvent={callBackNewEvent} />
        </ul>


    )
}

export default ItemList;