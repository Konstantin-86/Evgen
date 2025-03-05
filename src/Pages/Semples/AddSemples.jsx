import { useState } from "react";
import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewSemple } from "../../components/API/personSemple/addNewSemple";

import style from "./AddSemples.module.scss";
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

const AddSemples = ({
  numberID,
  showAddSemples,
  setShowAddSemples,
  setAlarm,
  setTextAlarm,
}) => {
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonColor, setNewPersonColor] = useState("#ffffff");
  const [newPersonStartTime, setNewPersonStartTime] = useState("09:00");
  const [newPersonEndTime, setNewPersonEndTime] = useState("21:00");
  const [newPersonRate, setNewPersonRate] = useState(100);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: addNewSemple,
    onSuccess: (_, newUser) => {
      setTextAlarm("Шаблон успешно добавлен");
      setAlarm(true);
      queryClient.setQueryData(["semples"], (oldData) => {
        return [...oldData, newUser];
      });
    },
  });
  const clearForm = () => {
    setNewPersonName("");
    setNewPersonColor("#ffffff");
    setNewPersonStartTime("09:00");
    setNewPersonEndTime("21:00");
    setNewPersonRate(100);
  };

  const handleAddUser = () => {
    if (newPersonName === "") {
      alert("Заполните имя");
      return;
    }
    if (newPersonRate === 0) {
      alert("Заполните ставку");
      return;
    }
    const nextID = numberID + 1;

    const newUser = {
      id: nextID,
      namePerson: newPersonName,
      startTime: newPersonStartTime,
      endTime: newPersonEndTime,
      currentRate: +newPersonRate,
      color: newPersonColor,
    };
    createMutation.mutate(newUser);
    clearForm();
    setShowAddSemples(false);
  };

  const handleFocus = (event) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className={showAddSemples ? style.addSemplesOpen : style.addSemplesClose}
    >
      <div className={style.wrap}>
        <div className={style.close} onClick={() => setShowAddSemples(false)}>
          <p className={style.closeIcon}></p>
        </div>
        <h2>Новый шаблон</h2>
        <div className={style.name}>
          <label htmlFor="username">Имя</label>
          <input
            type="text"
            id="username"
            onFocus={handleFocus}
            placeholder=""
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
          />
        </div>

        <div className={style.color}>
          <label htmlFor="userColor">Цвет</label>
          <input
            type="color"
            id="userColor"
            placeholder=""
            value={newPersonColor}
            onChange={(e) => setNewPersonColor(e.target.value)}
          />
        </div>

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

        <div className={style.rate}>
          <label htmlFor="userRate">Ставка</label>
          <input
            onFocus={handleFocus}
            value={newPersonRate}
            onChange={(e) => setNewPersonRate(e.target.value)}
            type="number"
            id="userRate"
          />
        </div>

        <button className={style.addButton} onClick={handleAddUser}>
          Добавить
        </button>
      </div>
    </div>
  );
};
export default AddSemples;
