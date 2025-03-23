import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllSemples } from "../../components/API/personSemple/getAllSemples";
import { nanoid } from "nanoid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { getPVZ1 } from "../../components/API/PVZ/getPVZ1";
import { getPVZ2 } from "../../components/API/PVZ/getPVZ2";
import { getPVZ3 } from "../../components/API/PVZ/getPVZ3";
import { deleteEventPVZ1 } from "../../components/API/PVZ/deleteEventPVZ1";
import { deleteEventPVZ2 } from "../../components/API/PVZ/deleteEventPVZ2";
import { deleteEventPVZ3 } from "../../components/API/PVZ/deleteEventPVZ3";
import PopUpEditEvent from "./PopUpEditEvent";

import SempleList from "./SempleList";

import styles from "./PopUp.module.scss";

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

const PopUp = ({
  day,
  handlePopUp,
  setHandlePopUp,
  callBackNewEvent,
  checkPVZ,
  setTextAlert,

}) => {
  const [showSemples, setShowSemples] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [currentPerson, setCurrentPerson] = useState({});
  const [handleNewEvent, setHandleNewEvent] = useState(false);
  const [checkPVZValue, setCheckPVZValue] = useState([]);
  const [maxId, setMaxId] = useState(0);
  const [PVZ, setPVZ] = useState([]);
  const [deletePVZFunction, setDeletePVZFunction] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["semples"],
    queryFn: getAllSemples,
  });

  const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
    queryKey: ["PVZ1"],
    queryFn: getPVZ1,
  });
  const { data: PVZ2, isLoading: isLoadingPVZ2 } = useQuery({
    queryKey: ["PVZ2"],
    queryFn: getPVZ2,
  });
  const { data: PVZ3, isLoading: isLoadingPVZ3 } = useQuery({
    queryKey: ["PVZ3"],
    queryFn: getPVZ3,
  });

  useEffect(() => {
    let checkPVZValue = []
    switch (checkPVZ) {
      case "PVZ1":
        checkPVZValue = PVZ1;
        setPVZ(PVZ1);
        setDeletePVZFunction(() => deleteEventPVZ1)
        break;
      case "PVZ2":
        checkPVZValue = PVZ2;
        setPVZ(PVZ2);
        setDeletePVZFunction(() => deleteEventPVZ2)
        break;
      case "PVZ3":
        checkPVZValue = PVZ3;
        setPVZ(PVZ3);
        setDeletePVZFunction(() => deleteEventPVZ3)
        break;
    }
    let preId = 0;
    if (PVZ1 && PVZ2 && PVZ3) {
      checkPVZValue.forEach((item) => {
        if (item.id > preId) {
          preId = item.id;
          setMaxId(item.id);
        }
      });
    }


  }, [PVZ1, PVZ2, PVZ3, checkPVZ, isLoadingPVZ1, isLoadingPVZ2, isLoadingPVZ3]);


  const addNewDay = (newItem) => {
    delete newItem.idPerson;
    newItem.date = day.date;

    callBackNewEvent(newItem);
    setSelectedItems([]);
    setHandlePopUp(false);
    setHandleNewEvent(false);

  };

  const deletePerson = useMutation({
    mutationFn: deletePVZFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [checkPVZ] });
      setTextAlert("Данные успешно удалены");
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const deleteEvent = (person) => {
    deletePerson.mutate(person.id);
    setHandlePopUp(false);

  };
  const editEvent = (person) => {
    setShowEditPopUp(true);
    setCurrentPerson(person);
  };
  const addNewEvent = () => {
    setHandleNewEvent(true);
  };
  const closePopUp = () => {
    setHandlePopUp(false);
    setHandleNewEvent(false);
    setSelectedItems([]);
    let preId = 0;
    checkPVZValue.forEach((item) => {
      if (item.id > preId) {
        setMaxId(item.id);
      }
    });
  };

  return (
    <div className={handlePopUp ? styles.popUpOpen : styles.popUpClose}>
      <div className={styles.container}>
        <div className={styles.popUpWrapper}>
          <div className={styles.closeIcon} onClick={closePopUp}></div>
          <h3 className={styles.currentDay}>
            {day.date}
            <p className={styles.dayOfWeek}>{day.dayOfWeek}</p>
          </h3>
          {day.data && day.data.length > 0 && handleNewEvent === false ? (
            day.data.map((person) => (
              <div className={styles.itemText} key={nanoid()}>
                <p className={styles.itemName}>
                  <span
                    className={styles.itemColor}
                    style={{ backgroundColor: person.color }}
                  >
                    {person.namePerson.slice(0, 2)}
                  </span>
                  <span>{person.namePerson}</span>
                </p>
                <p className={styles.time}>
                  {person.startTime} - {person.endTime}
                </p>
                <p className={styles.itemTimeDiffrance}>
                  {Number(person.endTime.slice(0, 2)) -
                    Number(person.startTime.slice(0, 2))}{" "}
                  ч
                </p>
                <p>
                  {(Number(person.endTime.slice(0, 2)) -
                    Number(person.startTime.slice(0, 2))) *
                    person.currentRate}{" "}
                  руб
                </p>

                <div className={styles.buttons}>
                  <IconButton
                    color="error"
                    size="medium"
                    onClick={() => deleteEvent(person)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="info" onClick={() => editEvent(person)}>
                    <EditOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <div>
              {showSemples && (
                <div>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <SempleList
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      addNewDay={addNewDay}
                      maxId={maxId}
                      setMaxId={setMaxId}
                    />
                  )}
                </div>
              )}
            </div>
          )}
          {day.data && day.data.length > 0 && handleNewEvent === false && (
            <button className={styles.addButton} onClick={addNewEvent}>
              Добавить
            </button>
          )}

          {showEditPopUp && (
            <PopUpEditEvent
              currentPerson={currentPerson}
              setShowEditPopUp={setShowEditPopUp}
              setHandlePopUp={setHandlePopUp}
              checkPVZ={checkPVZ}
              setTextAlert={setTextAlert}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
