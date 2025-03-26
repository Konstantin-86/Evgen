import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { getPVZ1 } from "../../components/API/PVZ/getPVZ1";
import { getPVZ2 } from "../../components/API/PVZ/getPVZ2";
import { getPVZ3 } from "../../components/API/PVZ/getPVZ3";

import getCurrentMonthAndYear from "./helpers/getCurrentMonthAndYear.js";
import filtredArray from "./helpers/filtredArray.js";

import StatGrafic from "./StatGrafic.jsx";

import styles from "./Statictics.module.scss";

import filters from "../../assets/filters.png";

const Statictics = () => {
  const [checkPVZ, setCheckPVZ] = useState("PVZ1");
  const [curMonth, setCurMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [filtredSumArray, setFiltredSumArray] = useState([]);
  const [summarHours, setSummarHours] = useState(0);
  const [summarRubles, setSummarRubles] = useState(0);
  const [selectName, setSelectName] = useState("Все");
  const [nameArray, setNameArray] = useState([]);
  const [customDateStart, setCustomDateStart] = useState("");
  const [customDateEnd, setCustomDateEnd] = useState("");
  const [selectPeriod, setSelectPeriod] = useState("month");
  const [PVZname, setPVZname] = useState("");
  const [handleFilter, setHandleFilter] = useState(false);
  const [alertInput, setAlertInput] = useState(false);
  const [showDetailsArray, setShowDetailsArray] = useState([]);

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
    const storedValue = sessionStorage.getItem("checkPVZ");
    const checkMonth = sessionStorage.getItem("curMonth");
    setCheckPVZ(storedValue || "PVZ1");

    if (checkMonth) {
      setCurMonth(checkMonth);
    } else {
      setCurMonth(getCurrentMonthAndYear());
    }
  }, []);

  useEffect(() => {
    const storedValue = sessionStorage.getItem("checkName");
    setSelectName(storedValue || "Все");
    if (!isLoadingPVZ1 && !isLoadingPVZ2 && !isLoadingPVZ3) {
      const allPVZ = [...PVZ1, ...PVZ2, ...PVZ3];
      const getUnikName = new Set(allPVZ.map((item) => item.namePerson));
      const getUnikNameArray = Array.from(getUnikName).sort((a, b) =>
        a.localeCompare(b)
      );
      setNameArray(getUnikNameArray);
    }
  }, [PVZ1, PVZ2, PVZ3, isLoadingPVZ1, isLoadingPVZ2, isLoadingPVZ3]);

  useEffect(() => {
    const [year, month] = curMonth.split("-").map(Number);
    const nextMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(nextMonth - 1);
    setDaysInMonth(lastDayOfMonth.getDate());
  }, [curMonth]);

  useEffect(() => {
    if (!isLoadingPVZ1 && !isLoadingPVZ2 && !isLoadingPVZ3) {
      let checkPVZValue = [];
      switch (checkPVZ) {
        case "PVZ1":
          checkPVZValue = PVZ1;
          setPVZname("НОВОТРОИЦК_26");
          break;
        case "PVZ2":
          checkPVZValue = PVZ2;
          setPVZname("НОВОТРОИЦК_42");
          break;
        case "PVZ3":
          checkPVZValue = PVZ3;
          setPVZname("НОВОТРОИЦК_48");
          break;
        case "allPVZ":
          checkPVZValue = [...PVZ1, ...PVZ2, ...PVZ3];
          setPVZname("Все ПВЗ");
          break;
      }

      const [arg1, arg2, arg3] = filtredArray(
        checkPVZValue,
        curMonth,
        selectName
      );
      setSummarHours(arg1);
      setSummarRubles(arg2);
      setFiltredSumArray(arg3);
    }
  }, [PVZ1, PVZ2, PVZ3, isLoadingPVZ1, isLoadingPVZ2, isLoadingPVZ3, curMonth]);

  const handleChange = (event) => {
    setCheckPVZ(event.target.value);
    sessionStorage.setItem("checkPVZ", event.target.value);
  };
  const handleChangeName = (event) => {
    setSelectName(event.target.value);
    sessionStorage.setItem("checkName", event.target.value);
  };

  const show = () => {
    if (selectPeriod === "period") {
      if (customDateStart === "" || customDateEnd === "") {
        setAlertInput(true);
        setTimeout(() => setAlertInput(false), 3000);
        return;
      }
    }
    setHandleFilter(!handleFilter);
    if (!isLoadingPVZ1 && !isLoadingPVZ2 && !isLoadingPVZ3) {
      let checkPVZValue = [];
      switch (checkPVZ) {
        case "PVZ1":
          checkPVZValue = PVZ1;
          break;
        case "PVZ2":
          checkPVZValue = PVZ2;
          break;
        case "PVZ3":
          checkPVZValue = PVZ3;
          break;
        case "allPVZ":
          checkPVZValue = [...PVZ1, ...PVZ2, ...PVZ3];
          break;
      }
      let per = "";
      if (selectPeriod === "month") {
        per = curMonth;
      } else {
        per = [customDateStart, customDateEnd];
      }

      const [arg1, arg2, arg3] = filtredArray(checkPVZValue, per, selectName);
      setSummarHours(arg1);
      setSummarRubles(arg2);
      setFiltredSumArray(arg3);
    }
  };
  const showTranslate = () => {
    switch (checkPVZ) {
      case "PVZ1":
        return "НОВОТРОИЦК_26";
      case "PVZ2":
        return "НОВОТРОИЦК_42";
      case "PVZ3":
        return "НОВОТРОИЦК_48";
      case "allPVZ":
        return "Все ПВЗ";
    }
  };

  const showDetails = (item) => {
    if (!showDetailsArray.includes(item.name)) {
      setShowDetailsArray([...showDetailsArray, item.name]);
    } else {
      setShowDetailsArray(showDetailsArray.filter((i) => i !== item.name));
    }
  };

  return (
    <div className={styles.statWrap}>
      <div className={styles.container}>
        <div
          className={
            handleFilter ? styles.innerFiltersActive : styles.innerFiltersHide
          }
        >
          <select name="choosePVZ" value={checkPVZ} onChange={handleChange}>
            <option value="PVZ1">НОВОТРОИЦК_26</option>
            <option value="PVZ2">НОВОТРОИЦК_42</option>
            <option value="PVZ3">НОВОТРОИЦК_48</option>
            <option value="allPVZ">Все</option>
          </select>
          <select
            name="chooseName"
            value={selectName}
            onChange={(event) => handleChangeName(event)}
          >
            <option value={"Все"}>Все</option>
            {nameArray.length &&
              nameArray.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </select>
          <div className={styles.innerCustomDate}>
            <div className={styles.dateWrapBtn}>
              <button
                onClick={() => setSelectPeriod("month")}
                style={
                  selectPeriod === "month"
                    ? { backgroundColor: "var(--accent)" }
                    : { backgroundColor: "var(--secondary-background)" }
                }
              >
                Месяц
              </button>
              <button
                onClick={() => setSelectPeriod("period")}
                style={
                  selectPeriod === "period"
                    ? { backgroundColor: "var(--accent)" }
                    : { backgroundColor: "var(--secondary-background)" }
                }
              >
                Период
              </button>
            </div>
            {selectPeriod === "period" && (
              <div
                className={
                  alertInput ? styles.customDateWrong : styles.customDate
                }
              >
                <input
                  type="date"
                  name="start"
                  value={customDateStart}
                  onChange={(e) => setCustomDateStart(e.target.value)}
                />
                <input
                  type="date"
                  name="end"
                  value={customDateEnd}
                  onChange={(e) => setCustomDateEnd(e.target.value)}
                />
              </div>
            )}
            {selectPeriod === "month" && (
              <input
                className={styles.inptMonth}
                type="month"
                value={curMonth}
                onChange={(e) => {
                  setCurMonth(e.target.value);
                  sessionStorage.setItem("curMonth", e.target.value);
                }}
              />
            )}
          </div>
          <button className={styles.buttonShow} onClick={show}>
            показать
          </button>
        </div>

        <div className={styles.innerCurSettings}>
          <p>{showTranslate()}</p>
          <p>{selectName === "Все" ? "Все работники" : selectName}</p>
          <p>
            {selectPeriod === "month"
              ? curMonth
              : `${customDateStart} - ${customDateEnd}`}
          </p>

          <img
            onClick={() => setHandleFilter(!handleFilter)}
            className={styles.filters}
            src={filters}
            alt=""
          />
        </div>

        <div className={styles.infoWrap}>
          <p>Дней в месяце: {daysInMonth}</p>
          <p>Часов в месяце {daysInMonth * 12}</p>
        </div>

        {filtredSumArray.length ? (
          <div className={styles.infoWrap}>
            <div className={styles.resultTable}>
              <p>Часов по факту: {summarHours}</p>
              <p>Всего сумма {summarRubles}руб</p>
            </div>
          </div>
        ) : null}

        <StatGrafic filtredSumArray={filtredSumArray} />

        <div className={styles.tableWrap}>
          {filtredSumArray.length ? (
            filtredSumArray
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item, index) => (
                <div
                  className={styles.statTable}
                  key={index}
                  onClick={() => showDetails(item)}
                >
                  <div className={styles.tableItem}>
                    <p className={styles.name}>{item.name}</p>
                    <p
                      className={
                        showDetailsArray.includes(item.name)
                          ? styles.hoursOpen
                          : styles.hours
                      }
                    >
                      {item.hours}ч
                    </p>
                    <div className={styles.itemMoney}>
                      <p className={styles.activeRes}>{item.result}</p>
                      <p className={styles.activeFines}>{item.fines}</p>
                      <p className={styles.activeBonus}>{item.bonus}</p>
                      <p className={styles.activeFinalRes}>
                        {item.finalResult}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      showDetailsArray.includes(item.name)
                        ? styles.detailsWrapShow
                        : styles.detailsWrapHide
                    }
                  >
                    <div className={styles.detailsHeader}>
                      <p>date</p>
                      <p>time</p>
                      <p>pvz</p>
                      <p>rate</p>
                      <p>fines</p>
                      <p>bonus</p>
                      <p>total</p>
                    </div>

                    {item.details
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((elem) => (
                        <div key={nanoid()} className={styles.detailItem}>
                          <p title={elem.date}>{elem.date}</p>
                          <p>
                            {elem.startTime} - {elem.endTime}
                          </p>
                          <p>{elem?.namePVZ}</p>
                          <p>{elem.rate}</p>
                          <p>{elem.fines}</p>
                          <p>{elem.bonus}</p>
                          <p>{elem.total}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))
          ) : (
            <h5>нет данных</h5>
          )}

          <div className={styles.explaneTable}>
            <p className={styles.explaneResult}>
              Общий заработк без учета бонусов и штрафов
            </p>
            <p className={styles.explaneFines}>Штрафы</p>
            <p className={styles.explaneBonus}>Бонусы</p>
            <p className={styles.explaneFinalResult}>
              Итого с учетом бонусов и штрафов
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Statictics;
