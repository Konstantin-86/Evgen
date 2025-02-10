import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllSemples } from '../../components/API/personSemple/getAllSemples'
import moment from 'moment';
import { nanoid } from 'nanoid'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { getPVZ1 } from '../../components/API/PVZ/getPVZ1'
import { getPVZ2 } from '../../components/API/PVZ/getPVZ2'

import styles from './PopUp.module.scss'

import closeBtn from '/close.png'


const time = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "21:00"
]


const PopUp = ({ day, handlePopUp, setHandlePopUp, callBackNewEvent }) => {

    const [showSemples, setShowSemples] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleClick = (item) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
        } else {
            const newItem = {
                ...item,
                otherData: item.otherData || { fines: 0, bonus: 0 },
            };
            setSelectedItems([...selectedItems, newItem]);
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['semples'],
        queryFn: getAllSemples,
    });
    const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
        queryKey: ['PVZ1'],
        queryFn: getPVZ1,
    });
    const { data: PVZ2, isLoading: isLoadingPVZ2 } = useQuery({
        queryKey: ['PVZ2'],
        queryFn: getPVZ2,
    });
    const currentDay = moment(day.date).format('DD.MM.YYYY');

    const addNewDay = (currentDay) => {
        const newEvent = {
            [currentDay]: [...selectedItems]
        };
        callBackNewEvent(newEvent);
        setSelectedItems([]);
        setHandlePopUp(false)
        setShowSemples(false);
    }

    const deleteEvent = (person) => {
        console.log(currentDay);
        console.log(person);
    }


    return (
        <div className={handlePopUp ? styles.popUpOpen : styles.popUpClose}>
            <div className={styles.popUpWrapper}>
                <button className={styles.closeButton} onClick={() => setHandlePopUp(false)}>
                    <img src={closeBtn} alt="" />
                </button>
                <h3 className={styles.currentDay}>{currentDay}
                    <p className={styles.dayOfWeek}>{day.dayOfWeek}</p>
                </h3>

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

                                <IconButton
                                    color='default'
                                    size="medium"
                                    onClick={() => deleteEvent(person)}
                                >
                                    <DeleteIcon />
                                </IconButton>

                            </div>
                        </div>
                    ))
                )
                    :
                    <div  >
                        <p className='noSemple' onClick={() => setShowSemples(true)}>На это день событий нету. Добавить?</p>

                        {showSemples &&
                            <div >
                                {isLoading ?
                                    <p>Loading...</p>
                                    :
                                    <div className={styles.sempleList}>
                                        {data.map((item) => (
                                            <div key={nanoid()}
                                                className={styles.semple}
                                                onClick={() => handleClick(item)}
                                                style={{
                                                    backgroundColor: selectedItems.some((selectedItem) => selectedItem.id === item.id)
                                                        ? '#3c6112'
                                                        : '#474747',
                                                }}>
                                                <p className={styles.sempleName}>{item.namePerson}</p>
                                                <p className={styles.sempleColor} style={{ backgroundColor: item.color }}></p>

                                                <p>{item.startTime} - {item.endTime}</p>
                                                <p>{item.currentRate} руб</p>
                                            </div>

                                        ))}
                                        <button className={styles.buttonAdd} onClick={() => addNewDay(currentDay)}>Сохранить</button>
                                    </div>
                                }
                            </div>}

                    </div>

                }

            </div>
        </div>
    )
}

export default PopUp