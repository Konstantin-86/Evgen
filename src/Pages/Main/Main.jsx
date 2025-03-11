import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getPVZ1 } from "../../components/API/PVZ/getPVZ1";
import { getPVZ2 } from "../../components/API/PVZ/getPVZ2";
import { addNewEventPVZ1 } from "../../components/API/PVZ/addNewEventPVZ1";
import { addNewEventPVZ2 } from "../../components/API/PVZ/addNewEventPVZ2";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ItemList from "./ItemList";
import styles from "./Main.module.scss";

import getCurrentWeek from "./helpers/getCurrentWeek.js";
import getCurrentDay from "./helpers/getCurrentDay.js";
import getNextWeek from "./helpers/getNextWeek.js";
import getPreviousWeek from "./helpers/getPrevWeek.js";
import { useSwipeable } from "react-swipeable";
import { Logger } from "sass";

const Main = () => {
  const queryClient = useQueryClient();

  const [currentWeek, setCurrentWeek] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [checkPVZ, setCheckPVZ] = useState("");
  const [pvz1Name, setPvz1Name] = useState("ПВЗ1");
  const [pvz2Name, setPvz2Name] = useState("ПВЗ2");
  const [startOfWeek, setStartOfWeek] = useState("");

  useEffect(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const newStartOfWeek = new Date(today);
    newStartOfWeek.setDate(
      today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)
    );
    setStartOfWeek(newStartOfWeek);
  }, []);

  useEffect(() => {
    const pvz1 = localStorage.getItem("pvz1name");
    const pvz2 = localStorage.getItem("pvz2name");
    if (pvz1) {
      setPvz1Name(pvz1);
    }
    if (pvz2) {
      setPvz2Name(pvz2);
    }
  }, []);

  const handleChange = (event) => {
    setCheckPVZ(event.target.value);
    sessionStorage.setItem("checkPVZ", event.target.value);
  };
  useEffect(() => {
    const storedValue = sessionStorage.getItem("checkPVZ");
    setCheckPVZ(storedValue || "PVZ1");
  }, []);

  const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
    queryKey: ["PVZ1"],
    queryFn: getPVZ1,
  });

  const { data: PVZ2, isLoading: isLoadingPVZ2 } = useQuery({
    queryKey: ["PVZ2"],
    queryFn: getPVZ2,
  });

  useEffect(() => {
    if (PVZ1 && !isLoadingPVZ1 && PVZ2 && !isLoadingPVZ2 && startOfWeek) {
      const checkPVZValue = checkPVZ === "PVZ1" ? PVZ1 : PVZ2;
      const getWeek = getCurrentWeek(checkPVZValue, startOfWeek);
      setCurrentWeek(getWeek);
    }
  }, [checkPVZ, PVZ1, isLoadingPVZ1, PVZ2, isLoadingPVZ2]);

  const createMutation = useMutation({
    mutationFn: (newUser) => {
      const checkPVZFn =
        checkPVZ === "PVZ1" ? addNewEventPVZ1 : addNewEventPVZ2;
      return checkPVZFn(newUser);
    },
    onSuccess: (_, newUser) => {
      queryClient.setQueryData([checkPVZ], (oldData) => {
        setTextAlert("Данные успешно добавлены");

        return [...oldData, newUser];
      });
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных:", error);
    },
  });

  const callBackNewEvent = (data) => {
    createMutation.mutate(data);
  };
  const nextweek = () => {
    const currentStartOfWeek = new Date(
      currentWeek[0].date.split(".").reverse().join("-")
    );
    const startOfNextWeek = new Date(currentStartOfWeek);
    startOfNextWeek.setDate(currentStartOfWeek.getDate() + 7);

    const checkPVZValue = checkPVZ === "PVZ1" ? PVZ1 : PVZ2;
    const nextWeek = getCurrentWeek(checkPVZValue, startOfNextWeek);
    setStartOfWeek(startOfNextWeek);
    setCurrentWeek(nextWeek);
  };
  const prevWeek = () => {
    const currentStartOfWeek = new Date(
      currentWeek[0].date.split(".").reverse().join("-")
    );
    const startOfNextWeek = new Date(currentStartOfWeek);
    startOfNextWeek.setDate(currentStartOfWeek.getDate() - 7);

    const checkPVZValue = checkPVZ === "PVZ1" ? PVZ1 : PVZ2;
    const prevWeek = getCurrentWeek(checkPVZValue, startOfNextWeek);
    setStartOfWeek(startOfNextWeek);
    setCurrentWeek(prevWeek);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      nextweek();
    },
    onSwipedRight: () => prevWeek(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className={styles.main}>
      <div className={styles.container}>
        <p className={showAlert ? styles.alert : styles.alertHide}>
          {textAlert}
        </p>
        <h3 style={{ marginBottom: "7px" }}>Сегодня {getCurrentDay()}</h3>
        <ToggleButtonGroup
          color="primary"
          value={checkPVZ}
          onChange={(event) => handleChange(event)}
          sx={{
            backgroundColor: "var(--secondary-background)",
            color: "var(--text)",
            marginBottom: "7px",
          }}
        >
          <ToggleButton value="PVZ1">{pvz1Name}</ToggleButton>
          <ToggleButton value="PVZ2">{pvz2Name}</ToggleButton>
        </ToggleButtonGroup>
        <ItemList
          checkPVZ={checkPVZ}
          currentWeek={currentWeek}
          callBackNewEvent={callBackNewEvent}
          setTextAlert={setTextAlert}
        />
      </div>
    </div>
  );
};

export default Main;
