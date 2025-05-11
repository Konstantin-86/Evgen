import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getPVZ1 } from "../../components/API/PVZ/getPVZ1";
import { getPVZ2 } from "../../components/API/PVZ/getPVZ2";
import { getPVZ3 } from "../../components/API/PVZ/getPVZ3";
import { addNewEventPVZ1 } from "../../components/API/PVZ/addNewEventPVZ1";
import { addNewEventPVZ2 } from "../../components/API/PVZ/addNewEventPVZ2";
import { addNewEventPVZ3 } from "../../components/API/PVZ/addNewEventPVZ3";

import ItemList from "./ItemList";
import styles from "./Main.module.scss";

import getCurrentWeek from "./helpers/getCurrentWeek.js";
import getCurrentDay from "./helpers/getCurrentDay.js";
import { useSwipeable } from "react-swipeable";
import krasnodar from "../../assets/FC_Krasnodar.png"

const Main = () => {
  const queryClient = useQueryClient();

  const [currentWeek, setCurrentWeek] = useState([]);
  const [PVZ, setPVZ] = useState([]);
  const [addPVZFunction, setAddPVZFunction] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [checkPVZ, setCheckPVZ] = useState("");
  const [startOfWeek, setStartOfWeek] = useState("");
  const [troll, setTroll] = useState(true)

  useEffect(() => {
    const wasShown = sessionStorage.getItem('trollShown');
    if (!wasShown) {
      setTimeout(() => {
        sessionStorage.setItem("trollShown", "done")
        setTroll(false)
      }, 1500);

    } else {
      setTroll(false);
    }
  }, []);

  const tryTroll = () => {
    sessionStorage.removeItem("trollShown")
  }

  useEffect(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const newStartOfWeek = new Date(today);
    newStartOfWeek.setDate(
      today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)
    );
    setStartOfWeek(newStartOfWeek);
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
  const { data: PVZ3, isLoading: isLoadingPVZ3 } = useQuery({
    queryKey: ["PVZ3"],
    queryFn: getPVZ3,
  });

  useEffect(() => {
    if (
      PVZ1 &&
      !isLoadingPVZ1 &&
      PVZ2 &&
      !isLoadingPVZ2 &&
      startOfWeek &&
      PVZ3 &&
      !isLoadingPVZ3
    ) {
      let checkPVZValue = [];
      switch (checkPVZ) {
        case "PVZ1":
          checkPVZValue = PVZ1;
          setPVZ(PVZ1);
          setAddPVZFunction(() => addNewEventPVZ1);
          break;
        case "PVZ2":
          checkPVZValue = PVZ2;
          setPVZ(PVZ2);
          setAddPVZFunction(() => addNewEventPVZ2);
          break;
        case "PVZ3":
          checkPVZValue = PVZ3;
          setPVZ(PVZ3);
          setAddPVZFunction(() => addNewEventPVZ3);
          break;
      }
      const getWeek = getCurrentWeek(checkPVZValue, startOfWeek);
      setCurrentWeek(getWeek);
    }
  }, [
    checkPVZ,
    PVZ1,
    isLoadingPVZ1,
    PVZ2,
    isLoadingPVZ2,
    PVZ3,
    isLoadingPVZ3,
    startOfWeek,
  ]);

  const createMutation = useMutation({
    mutationFn: (newUser) => {
      return addPVZFunction(newUser);
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

    const nextWeek = getCurrentWeek(PVZ, startOfNextWeek);
    setStartOfWeek(startOfNextWeek);
    setCurrentWeek(nextWeek);
  };
  const prevWeek = () => {
    const currentStartOfWeek = new Date(
      currentWeek[0].date.split(".").reverse().join("-")
    );
    const startOfNextWeek = new Date(currentStartOfWeek);
    startOfNextWeek.setDate(currentStartOfWeek.getDate() - 7);
    const prevWeek = getCurrentWeek(PVZ, startOfNextWeek);
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
      {troll ?
        <div className={styles.troll}>
          <img src={krasnodar} alt="krasnodar" />
          <h1>Чемпион</h1>
        </div>
        :
        null
      }

      <div className={styles.container}>
        <p className={showAlert ? styles.alert : styles.alertHide}>
          {textAlert}
        </p>
        <h3 style={{ marginBottom: "7px" }}>Сегодня {getCurrentDay()}</h3>

        <select name="choosePVZ" value={checkPVZ} onChange={handleChange}>
          <option value="PVZ1">НОВОТРОИЦК_26</option>
          <option value="PVZ2">НОВОТРОИЦК_42</option>
          <option value="PVZ3">НОВОТРОИЦК_48</option>
        </select>
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
