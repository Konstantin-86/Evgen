
import { nanoid } from 'nanoid';
import style from '../styles/ItemList.module.scss'


const ItemList = ({ day, editTask, addTask }) => {
    return (

        <li className={style.item}    >
            <h3 className={style.title}>{day.day}</h3>
            {day.schedule
                ?
                <div className={style.table}>
                    <ul className={style.tableTitles}>
                        <li>Имя</li>
                        <li>Начало</li>
                        <li>Конец</li>
                        <li>Часы</li>
                    </ul>
                    {day.schedule.map((schedule) => (
                        <ul className={style.itemIinfo} onClick={() => editTask(schedule)} key={nanoid()}>
                            <li className="">{schedule.personName}</li>
                            <li className="">{schedule.startTime}</li>
                            <li className="">{schedule.endTime}</li>
                            <li className="">{Number(schedule.endTime.slice(0, 2)) - Number(schedule.startTime.slice(0, 2))} </li>
                        </ul>
                    ))}
                </div>

                :
                <div className={style.noTasks}>Нет задач</div>
            }
            <button className={style.addBtn} onClick={() => addTask(day.day)}>Добавить</button>
        </li>


    )
}

export default ItemList;