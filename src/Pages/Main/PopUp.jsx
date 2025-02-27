import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllSemples } from '../../components/API/personSemple/getAllSemples'
import { nanoid } from 'nanoid'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { getPVZ1 } from '../../components/API/PVZ/getPVZ1'
import { getPVZ2 } from '../../components/API/PVZ/getPVZ2'
import { deleteEventPVZ1 } from '../../components/API/PVZ/deleteEventPVZ1';
import { deleteEventPVZ2 } from '../../components/API/PVZ/deleteEventPVZ2';
import PopUpEditEvent from './PopUpEditEvent';

import styles from './PopUp.module.scss'

import closeBtn from '/close.png'
import SempleList from './SempleList';


const time = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "21:00"
]


const PopUp = ({ day, handlePopUp, setHandlePopUp, callBackNewEvent, checkPVZ }) => {

    const [showSemples, setShowSemples] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [currentPerson, setCurrentPerson] = useState({});
    const [handleNewEvent, setHandleNewEvent] = useState(false);
   
    const queryClient = useQueryClient();
    

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
    



    

    const addNewDay = () => {
        let maxId = 0
        const checkPVZValue = checkPVZ === 'PVZ1' ? PVZ1 : PVZ2
        checkPVZValue.forEach(item => {
            if (item.id > maxId) {
                maxId = item.id
            }
        })
        console.log(maxId);
        console.log("selectedItems", selectedItems);
        
       const updatedArray = selectedItems.map((item, index) => {
  
        delete item.idPerson
            return {
                ...item,
                id: maxId + index + 1,
                date: day.date,
            }
        })
        callBackNewEvent(updatedArray);
        setSelectedItems([]);
        setHandlePopUp(false)
        setHandleNewEvent(false)
    }

    const deletePerson = useMutation({
        mutationFn: checkPVZ === "PVZ1" ? deleteEventPVZ1 : deleteEventPVZ2, 
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [checkPVZ] }); 
          console.log('Item deleted successfully!');
        },
        onError: (error) => {
          console.error('Error deleting item:', error);
        },
      });

    const deleteEvent = (person) => {
        console.log(person);
        deletePerson.mutate(person.id)
        setHandlePopUp(false)
    }
    const editEvent = (person)=> {
        setShowEditPopUp(true)
        setCurrentPerson(person)
        
    }
    const addNewEvent = () => {
        setHandleNewEvent(true)
    }
    const closePopUp = () => {
        setHandlePopUp(false)
        setHandleNewEvent(false)
        setSelectedItems([])
    }


    return (
        <div className={handlePopUp ? styles.popUpOpen : styles.popUpClose}>
            <div className={styles.popUpWrapper}>
                <button className={styles.closeButton} onClick={closePopUp}>
                    <img src={closeBtn} alt="" />
                </button>
                <h3 className={styles.currentDay}>{day.date}
                    <p className={styles.dayOfWeek}>{day.dayOfWeek}</p>
                </h3>
                {day.data && day.data.length > 0 && handleNewEvent === false
                ? 
                   ( day.data.map(person => (
                        <div className={styles.itemText} key={nanoid()}  >
                            <p className={styles.itemName}>
                                <span className={styles.itemColor} style={{ backgroundColor: person.color }}>{person.namePerson.slice(0, 2)}</span>
                                <span>{person.namePerson}</span>
                            </p>
                            <p className={styles.time}>{person.startTime} - {person.endTime}</p>
                            <p className={styles.itemTimeDiffrance}>{Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))} ч</p>
                            <p>{(Number(person.endTime.slice(0, 2)) - Number(person.startTime.slice(0, 2))) * person.currentRate} руб</p>

                            <div className={styles.buttons}>
                                <IconButton
                                    color='default'
                                    size="medium"
                                    onClick={() => deleteEvent(person)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => editEvent(person)}>
                                <EditOutlinedIcon/>
                                </IconButton>

                            </div>
                        </div>
                    ))
                    )
                :
                    <div  >
                        {showSemples &&
                            <div >
                                {isLoading  ?
                                    <p>Loading...</p>
                                    :
                                    <SempleList
                                        selectedItems={selectedItems}
                                        setSelectedItems={setSelectedItems}
                                        addNewDay={addNewDay}
                                    />
                                   /*  <div className={styles.sempleList}>
                                        {data.map((item) => (
                                            <div key={nanoid()}
                                                className={styles.semple}
                                                onClick={() => handleClick(item)}
                                                style={{
                                                    backgroundColor: selectedItems.some((selectedItem) => selectedItem.idPerson === item.idPerson)
                                                        ? '#3c6112'
                                                        : '#474747',
                                                }}>
                                                <p className={styles.sempleName}>{item.namePerson}</p>
                                                <p className={styles.sempleColor} style={{ backgroundColor: item.color }}></p>

                                                <p>{item.startTime} - {item.endTime}</p>
                                                <p>{item.currentRate} руб</p>
                                            </div>

                                        ))}
                                        {data.length === 0 
                                        ? <p>Нет шаблонов</p>
                                        : <button className={styles.buttonAdd} onClick={addNewDay}>Сохранить</button>  }
                                        
                                    </div> */
                                }
                            </div>}

                    </div>

                }
                {
                    day.data && day.data.length > 0 && handleNewEvent === false && <button onClick={addNewEvent}>Добавить</button>
                }
                

        {
            showEditPopUp && <PopUpEditEvent  
            currentPerson={currentPerson} 
            setShowEditPopUp={setShowEditPopUp}
            setHandlePopUp={setHandlePopUp}
            checkPVZ={checkPVZ}
            />
        }
            </div>
        </div>
    )
}

export default PopUp