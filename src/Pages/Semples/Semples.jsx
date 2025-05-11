import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { editSemple } from "../../components/API/personSemple/editSemple.js";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { getAllSemples } from "../../components/API/personSemple/getAllSemples";
import { deleteSemple } from "../../components/API/personSemple/deleteSemple";
import AddSemples from "./AddSemples";

import style from "./Semples.module.scss";
import PopupEditSemples from "./PopupEditSemples";

const Semples = () => {
  const queryClient = useQueryClient();
  const [showAddSemples, setShowAddSemples] = useState(false);
  const [numberID, setNumberID] = useState(0);
  const [currentPerson, setCurrentPerson] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [textAlarm, setTextAlarm] = useState("Шаблон успешно изменен");
  const [alarm, setAlarm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["semples"],
    queryFn: getAllSemples,
  });



  useEffect(() => {
    if (!isLoading && data) {
      let maxId = 0;
      data.forEach((item) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      });
      setNumberID(maxId);
    }
  }, [isLoading, data]);

  const deleteMutation = useMutation({
    mutationFn: deleteSemple,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["semples"], (oldData) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });
  const deletePerson = (id) => {
    deleteMutation.mutate(id);
    setTextAlarm("Шаблон успешно удален");
  };

  const editMutation = useMutation({
    mutationFn: (newUser) => {
      return editSemple(newUser);
    },
    onSuccess: (_, newUser) => {
      queryClient.setQueryData(["semples"], (oldData) => {
        setTextAlarm("Шаблон изменен");
        const index = oldData.findIndex((user) => user.id === newUser.id);
        if (index !== -1) {
          const newData = [...oldData];
          newData[index] = newUser;
          return newData;
        }
        return oldData;
      });
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных:", error);
    },
  });
  const editPerson = (item) => {
    setShowPopup(true);
    setCurrentPerson(item);
  };
  const callbackToEditSemple = (semple) => {
    semple.id = currentPerson.id;
    editMutation.mutate(semple);
  };

  return (
    <div className={style.wrap}>
      <div className={style.container}>
        <h1>Шаблоны</h1>
        <div className={alarm ? style.showAlarm : style.hideAlarm}>
          {textAlarm}
        </div>
        <ul className={style.list}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data.map((item) => (
              <li key={nanoid()} className={style.item}>
                <p className={style.itemName}>{item.namePerson}</p>
                <p
                  className={style.itemColor}
                  style={{ backgroundColor: item.color }}
                ></p>
                <p>
                  {item.startTime} - {item.endTime}
                </p>
                <p>{item.currentRate} руб</p>
                <div className={style.hours}>
                  {Number(item.endTime.slice(0, 2)) -
                    Number(item.startTime.slice(0, 2))}
                  ч
                </div>
                <button
                  className={style.edetSemple}
                  onClick={() => editPerson(item)}
                >
                  <EditOutlinedIcon style={{ color: "var(--text)" }} />
                </button>
                <div
                  className={style.deleteIcon}
                  onClick={() => deletePerson(item.id)}
                >
                  <DeleteOutlineIcon />
                </div>
              </li>
            ))
          )}
        </ul>

        <button
          className={style.addButton}
          onClick={() => setShowAddSemples(!showAddSemples)}
        >
          Добавить
        </button>
        <AddSemples
          numberID={numberID}
          showAddSemples={showAddSemples}
          setShowAddSemples={setShowAddSemples}
          setTextAlarm={setTextAlarm}
        />
      </div>
      {showPopup && (
        <PopupEditSemples
          person={currentPerson}
          setShowPopup={setShowPopup}
          callbackToEditSemple={callbackToEditSemple}
        />
      )}
    </div>
  );
};
export default Semples;
