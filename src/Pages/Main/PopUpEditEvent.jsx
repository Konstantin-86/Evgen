import React, { useState } from "react";
import { nanoid } from "nanoid";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEventPVZ1 } from "../../components/API/PVZ/editEventPVZ1";
import { editEventPVZ2 } from "../../components/API/PVZ/editEventPVZ2";
import { editEventPVZ3 } from "../../components/API/PVZ/editEventPVZ3";

import styles from "./PopUpEditEvent.module.scss";

const time = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];
const PopUpEditEvent = ({
  currentPerson,
  setShowEditPopUp,
  setHandlePopUp,
  checkPVZ,
  setTextAlert,
}) => {
  const [startTimeState, setStartTimeState] = useState(currentPerson.startTime);
  const [endTimeState, setEndTimeState] = useState(currentPerson.endTime);
  const [currentRateState, setCurrentRateState] = useState(
    currentPerson.currentRate
  );
  const [finesState, setFinesState] = useState(currentPerson.otherData.fines);
  const [bonusState, setBonusState] = useState(currentPerson.otherData.bonus);
  const [finesInfo, setFinesInfo] = useState(currentPerson.otherData.finesInfo);
  const [bonusInfo, setBonusInfo] = useState(currentPerson.otherData.bonusInfo);
  console.log(currentPerson);


  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newUser) => {
      let checkPVZFn = [];
      switch (checkPVZ) {
        case "PVZ1":
          checkPVZFn = editEventPVZ1;
          break;
        case "PVZ2":
          checkPVZFn = editEventPVZ2;
          break;
        case "PVZ3":
          checkPVZFn = editEventPVZ3;
          break;
      }
      return checkPVZFn(newUser);
    },
    onSuccess: (_, newUser) => {
      setTextAlert("Данные успешно изменены");
      queryClient.setQueryData([checkPVZ], (oldData) => {
        const index = oldData.findIndex((user) => user.id === newUser.id);
        if (index !== -1) {
          const newData = [...oldData];
          newData[index] = { ...newData[index], ...newUser };
          closeAll();
          return newData;
        }
        return oldData;
      });
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных:", error);
    },
  });

  const changeEvent = () => {
    const newEvent = {
      ...currentPerson,
      startTime: startTimeState,
      endTime: endTimeState,
      currentRate: currentRateState,
      otherData: {
        ...currentPerson.otherData,
        fines: finesState,
        finesInfo: finesInfo,
        bonus: bonusState,
        bonusInfo: bonusInfo,
      },
    };
    createMutation.mutate(newEvent);
  };

  const closeAll = () => {
    setShowEditPopUp(false);
    setHandlePopUp(false);
  };

  return (
    <div className={styles.wrapEdit}>
      <div onClick={closeAll} className={styles.closeButton}></div>

      <h5>{currentPerson.date}</h5>
      <h3 className={styles.name}>{currentPerson.namePerson}</h3>

      <p>начало</p>
      <select
        name="startTime"
        value={startTimeState}
        onChange={(e) => setStartTimeState(e.target.value)}
      >
        {time.map((elem) => (
          <option key={nanoid()} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <p>конец</p>
      <select
        name="startTime"
        value={endTimeState}
        onChange={(e) => setEndTimeState(e.target.value)}
      >
        {time.map((elem) => (
          <option key={nanoid()} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <p>ставка</p>
      <input
        type="number"
        value={currentRateState}
        onChange={(e) => setCurrentRateState(e.target.value)}
      />
      <p>штраф</p>
      <input
        type="number"
        value={finesState}
        onChange={(e) => setFinesState(e.target.value)}
      />
      {finesState > 0 && (
        <div className={styles.textareaContainer}>
          <label htmlFor="finesInfo" className={styles.labelInfo}>
            А за шо?
          </label>
          <textarea
            id="finesInfo"
            className={styles.textarea}
            name="finesInfo"
            value={finesInfo}
            onChange={(e) => setFinesInfo(e.target.value)}
          />
        </div>
      )}

      <p>бонус</p>
      <input
        type="number"
        value={bonusState}
        onChange={(e) => setBonusState(e.target.value)}
      />
      {bonusState > 0 && (
        <div className={styles.textareaContainer}>
          <label htmlFor="bonusInfo" className={styles.labelInfo}>
            А почему так мало?
          </label>
          <textarea
            id="bonusInfo"
            className={styles.textarea}
            name="bonusInfo"
            value={bonusInfo}
            onChange={(e) => setBonusInfo(e.target.value)}
          />
        </div>
      )}


      < button className={styles.editButton} onClick={changeEvent}>
        Готово
      </button>
    </div >
  );
};

export default PopUpEditEvent;
