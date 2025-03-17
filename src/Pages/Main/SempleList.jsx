import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { getAllSemples } from "../../components/API/personSemple/getAllSemples";

import styles from "./SempleList.module.scss";

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
  const addNewEvent = (item) => {
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
