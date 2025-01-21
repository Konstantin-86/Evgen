
import { nanoid } from 'nanoid';
import style from '../styles/ItemList.module.scss'


const ItemList = ({ day, editTask, addTask }) => {
    const shortDate = (day.day).slice(0, 2)

    return (

        <li className={style.item}    >
            <h3 className={style.title}>{shortDate}</h3>
            {day.schedule
                ?
                <div className={style.table}>
                    {day.schedule.map((schedule) => (
                        <ul className={style.itemIinfo} onClick={() => editTask(schedule)} key={nanoid()}>
                            <li className={style.itemTime}>{schedule.startTime}</li>
                            <li className={style.itemLi}>{schedule.personName}</li>
                            <li className={style.itemHours}>{Number(schedule.endTime.slice(0, 2)) - Number(schedule.startTime.slice(0, 2))}ч</li>
                        </ul>
                    ))}
                </div>

                :
                <div className={style.noTasks}>Нет задач</div>
            }
            <button className={style.addBtn} onClick={() => addTask(day.day)}></button>
        </li>


    )
}

export default ItemList;