import { useState } from 'react'
import { nanoid } from 'nanoid';
import style from './ItemList.module.scss'
import PopUp from './PopUp';

const dayOfWeek = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс",
]


const ItemList = ({checkPVZ, currentWeek, callBackNewEvent }) => {

    const [currentDay, setCurrentDay] = useState([]);
    const [handlePopUp, setHandlePopUp] = useState(false);

    const popUp = (day) => {
        setCurrentDay(day);
        setHandlePopUp(true);
    }

    return (

        <ul className={style.itemList}>
            {currentWeek.length && currentWeek.map((day, index) => (
                <li className={style.item} key={nanoid()} onClick={() => popUp(day)}>
                    <div className={style.dayOfWeek}>
                        <p className={style.itemDayofWeek}>{dayOfWeek[index]}</p>
                        <p className={style.itemDay}>{day.date.slice(0, 2)}</p>
                    </div>
                    {day.data.length ? 
                    <ul className={style.itemInfoList}>
                        { day.data.map((item) => (
                            <li className={style.itemInfo} key={nanoid()} >
                                <p className={style.startTime}>{item.startTime}-{item.endTime}</p>
                                <p className={style.itemColor} style={{ backgroundColor: item.color }} >{item.namePerson.slice(0, 2)}</p>
                                <p className={style.namePerson}>{item.namePerson}</p>
                                <p className={style.sumOfTime}>{Number(item.endTime.slice(0, 2)) - Number(item.startTime.slice(0, 2))}ч </p>
                            </li>
                        ))}
                    </ul>
                        :
                        <div>нет данных</div>
                    }
                </li>
            ))}
            <PopUp checkPVZ={checkPVZ} day={currentDay} handlePopUp={handlePopUp} setHandlePopUp={setHandlePopUp} callBackNewEvent={callBackNewEvent} />
        </ul>


    )
}

export default ItemList;