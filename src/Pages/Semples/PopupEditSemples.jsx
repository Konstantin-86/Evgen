import { useState } from "react";
import { nanoid } from "nanoid";

import styles from "./PopupEditSemples.module.scss";

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

const PopupEditSemples = ({ person, setShowPopup, callbackToEditSemple }) => {
  const [newName, setNewName] = useState(person.namePerson);
  const [newColor, setNewColor] = useState(person.color);
  const [newStartTime, setNewStartTime] = useState(person.startTime);
  const [newEndTime, setNewEndTime] = useState(person.endTime);
  const [newRate, setNewRate] = useState(person.currentRate);

  const handleFocus = (event) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const setChange = () => {
    const newUser = {
      namePerson: newName,
      startTime: newStartTime,
      endTime: newEndTime,
      currentRate: +newRate,
      color: newColor,
    };
    callbackToEditSemple(newUser);
    setShowPopup(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        <div
          className={styles.closeIcon}
          onClick={() => setShowPopup(false)}
        ></div>
        <div>
          <input
            className={styles.name}
            type="text"
            id="username"
            onFocus={handleFocus}
            placeholder=""
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className={styles.color}>
          <input
            type="color"
            id="userColor"
            placeholder=""
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
        </div>

        <select
          className={styles.select}
          name="startTime"
          value={newStartTime}
          onChange={(e) => setNewStartTime(e.target.value)}
        >
          {time.map((elem) => (
            <option key={nanoid()} value={elem}>
              {elem}
            </option>
          ))}
        </select>

        <select
          name="endTime"
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
        >
          {time.map((elem) => (
            <option key={nanoid()} value={elem}>
              {elem}
            </option>
          ))}
        </select>

        <div>
          <label className={styles.rate} htmlFor="userRate">
            Ставка
          </label>
          <input
            onFocus={handleFocus}
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            type="number"
            id="userRate"
          />
        </div>
        <button onClick={setChange}>Готово</button>
      </div>
    </div>
  );
};

export default PopupEditSemples;
