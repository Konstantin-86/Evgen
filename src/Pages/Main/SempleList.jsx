import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { getAllSemples } from "../../components/API/personSemple/getAllSemples";

import styles from "./SempleList.module.scss";
import { Alarm } from "@mui/icons-material";

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

const SempleList = ({
  dayArray,
  selectedItems,
  setSelectedItems,
  addNewDay,
  maxId,
  setMaxId,
}) => {


  const { data } = useQuery({
    queryKey: ["semples"],
    queryFn: getAllSemples,
  });
  const [itemCheckedId, setItemCheckedId] = useState("");
  const [newPersonStartTime, setNewPersonStartTime] = useState("");
  const [newPersonEndTime, setNewPersonEndTime] = useState("");
  const [alarm, setAlarm] = useState(false)

  const isItemSelected = (item, selectedItems) => {
    return selectedItems.some(
      (selectedItem) =>
        selectedItem.namePerson === item.namePerson &&
        selectedItem.startTime === item.startTime &&
        selectedItem.endTime === item.endTime
    );
  };

  const handleClick = (item) => {
    if (item.id === itemCheckedId) {
      return;
    }
    setItemCheckedId(item.id);
    setNewPersonStartTime(item.startTime);
    setNewPersonEndTime(item.endTime);
  };

  function isTimeAvailable(newSlot, existingSlots) {
    if (!time.includes(newSlot.startTime) || !time.includes(newSlot.endTime)) {
      return false;
    }

    const startIndex = time.indexOf(newSlot.startTime);
    const endIndex = time.indexOf(newSlot.endTime);
    if (startIndex >= endIndex) {
      return false;
    }

    for (const slot of existingSlots) {
      const existingStartIndex = time.indexOf(slot.startTime);
      const existingEndIndex = time.indexOf(slot.endTime);

      if (startIndex < existingEndIndex && endIndex > existingStartIndex) {
        return false;
      }
    }

    return true;
  }
  const addNewEvent = (item) => {

    const newSlot1 = { startTime: newPersonStartTime, endTime: newPersonEndTime }
    let existingSlots = []
    dayArray?.data.map((elem) => {
      existingSlots.push({ startTime: elem.startTime, endTime: elem.endTime })
    })

    if (!isTimeAvailable(newSlot1, existingSlots)) {
      setAlarm(true)
      setTimeout(() => {
        setAlarm(false)
      }, 1500);
      return
    }

    const newItem = {
      ...item,
      id: maxId + 1,
      startTime: newPersonStartTime,
      endTime: newPersonEndTime,
      otherData: item.otherData || { fines: 0, bonus: 0 },
    };
    setSelectedItems([newItem]);
    setMaxId(maxId + 1);
    setItemCheckedId("");
    addNewDay(newItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sempleList}>
        {alarm ?
          <div className={styles.alarmWrap}>
            <div className={styles.alarmContent}>
              <p>Глаза разуй, время не правильно указано</p>
            </div>
          </div>
          :
          null}

        {data
          .map((item) => (
            <div
              key={nanoid()}
              className={styles.semple}
              onClick={() => handleClick(item)}
              style={{
                backgroundColor: isItemSelected(item, selectedItems)
                  ? "var(--accent)"
                  : "var(--secondary-background)",
              }}
            >
              <p className={styles.sempleName}>{item.namePerson}</p>
              <p
                className={styles.sempleColor}
                style={{ backgroundColor: item.color }}
              ></p>
              <p>
                {item.startTime} - {item.endTime}
              </p>
              <p>{item.currentRate} руб</p>
              {itemCheckedId === item.id && (
                <div className={styles.wrapNewTime}>
                  <select
                    name="startTime"
                    value={newPersonStartTime}
                    onChange={(e) => setNewPersonStartTime(e.target.value)}
                  >
                    {time.map((elem) => (
                      <option key={nanoid()} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </select>

                  <select
                    name="endTime"
                    value={newPersonEndTime}
                    onChange={(e) => setNewPersonEndTime(e.target.value)}
                  >
                    {time.map((elem) => (
                      <option key={nanoid()} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </select>
                  <button
                    className={styles.buttonAdd}
                    onClick={() => addNewEvent(item)}
                  >
                    Создать
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SempleList;
