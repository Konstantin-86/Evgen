import { useState } from 'react'
import moment from 'moment';
import { nanoid } from 'nanoid';
import style from './ItemList.module.scss'
import PopUp from './PopUp';


const ItemList = ({ weekData, callBackNewEvent }) => {

    const [currentDay, setCurrentDay] = useState([]);
    const [handlePopUp, setHandlePopUp] = useState(false);


    const popUp = (day) => {
        setCurrentDay(day);
        setHandlePopUp(true);
    }
    return (

        <ul className={style.itemList}>

            {weekData.map((day) => (
                <li key={nanoid()} className={style.item} onClick={() => popUp(day)}>
                    <div className={style.itemDay}>
                        <p className={style.dayOfWeek}>{day.dayOfWeek}</p>
                        <p className={style.day}>{moment(day.date).format('DD')}</p>
                    </div>
                    <div className={style.itemInfo}>
                        {day.data.length > 0 ? (
                            day.data.map(person => (
                                <div className={style.itemText} key={person.id}  >
                                    <p className={style.startTime}>{person.startTime}</p>
                                    <p className={style.itemColor} style={{ backgroundColor: person.color }} >{person.namePerson.slice(0, 2)}</p>
                                    <p className={style.namePerson}>{person.namePerson}</p>
                                    <p>{Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))}ч </p>

                                </div>
                            ))
                        ) : (
                            <p>Нет данных</p>
                        )}
                    </div>

                </li>
            ))}
            <PopUp day={currentDay} handlePopUp={handlePopUp} setHandlePopUp={setHandlePopUp} callBackNewEvent={callBackNewEvent} />
        </ul>


    )
}

export default ItemList;