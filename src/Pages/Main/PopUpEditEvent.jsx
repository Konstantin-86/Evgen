import React, { useState } from 'react'
import { nanoid } from 'nanoid';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {editEventPVZ1} from '../../components/API/PVZ/editEventPVZ1'
import {editEventPVZ2} from '../../components/API/PVZ/editEventPVZ2'

import styles from './PopUpEditEvent.module.scss'


const time = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00",
    "21:00"
  ]
const PopUpEditEvent = ({currentPerson, setShowEditPopUp, setHandlePopUp, checkPVZ, setTextAlert, setShowAlert}) => {
    const [startTimeState, setStartTimeState] = useState(currentPerson.startTime);
    const [endTimeState, setEndTimeState] = useState(currentPerson.endTime);
    const [currentRateState, setCurrentRateState] = useState(currentPerson.currentRate);
    const [finesState, setFinesState] = useState(currentPerson.otherData.fines);
    const [bonusState, setBonusState] = useState(currentPerson.otherData.bonus);

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (newUser) => {
          const checkPVZFn = checkPVZ === 'PVZ1' ? editEventPVZ1 : editEventPVZ2
          return checkPVZFn(newUser)
        },
        onSuccess: (_, newUser) => {
          setTextAlert('Данные успешно изменены')
          setShowAlert(true);
          queryClient.setQueryData([checkPVZ], (oldData) => {
      const index = oldData.findIndex(user => user.id === newUser.id);
      if (index !== -1) {
        const newData = [...oldData];
        newData[index] = { ...newData[index], ...newUser };
        closeAll()
        return newData;
      }
      return oldData;
          });
        },
        onError: (error) => {
          console.error('Ошибка при отправке данных:', error);
        }
      })
 
    const changeEvent = ()=> {
        const newEvent = {
            ...currentPerson,
            startTime: startTimeState,
            endTime: endTimeState,
            currentRate: currentRateState,
            otherData: {
                ...currentPerson.otherData,
                fines: finesState,
                bonus: bonusState,
            },
        }
        createMutation.mutate(newEvent)
    }

    const closeAll = () => {
        setShowEditPopUp(false)
        setHandlePopUp(false)
    }
  
  return (
    <div className={styles.wrapEdit}>
        <button onClick={closeAll} className={styles.closeButton}></button>
        
        <p>{currentPerson.date}</p>
        <p className={styles.name}>{currentPerson.namePerson}</p>

        <p>начало</p>
        <select name="startTime" value={startTimeState} onChange={(e) => setStartTimeState(e.target.value)}>
                  {time.map((elem) => (<option key={nanoid()} value={elem}>{elem}</option>))}
        </select>
        <p>конец</p>
        <select name="startTime" value={endTimeState} onChange={(e) => setEndTimeState(e.target.value)}>
                  {time.map((elem) => (<option key={nanoid()} value={elem}>{elem}</option>))}
        </select>
                <label htmlFor="currentRate">ставка</label>
                <input type="number" value={currentRateState} onChange={(e) => setCurrentRateState(e.target.value)} />
                <label htmlFor="fines">штраф</label>
                <input type="number" value={finesState} onChange={(e) => setFinesState(e.target.value)} />
              <label htmlFor="bonus">бонус</label>
                <input type="number" value={bonusState} onChange={(e) => setBonusState(e.target.value)} />

<button onClick={changeEvent}> Изменить</button>
    </div>
  )
}

export default PopUpEditEvent