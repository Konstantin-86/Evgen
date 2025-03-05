import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";

import style from "./Settings.module.scss";

const Settings = () => {
  const [pvz1Name, setPvz1Name] = useState("ПВЗ1");
  const [pvz2Name, setPvz2Name] = useState("ПВЗ2");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [settingAlarm, setSettingAlarm] = useState(false);
  const [alarmText, setAlarmText] = useState("");

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setChange = () => {
    if (pvz1Name.length > 10 || pvz2Name.length > 10) {
      setSettingAlarm(true);
      setAlarmText("Слишком длинное название, max 10 символов");
      setTimeout(() => {
        setSettingAlarm(false);
      }, 3000);
    } else {
      setSettingAlarm(true);
      setAlarmText("Обновил");
      setTimeout(() => {
        setSettingAlarm(false);
      }, 2000);
      localStorage.setItem("pvz1name", pvz1Name);
      localStorage.setItem("pvz2name", pvz2Name);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className={style.settings}>
      <div className={style.pvzWrapper}>
        <div className={settingAlarm ? style.showAlarm : style.hideAlarm}>
          {alarmText}
        </div>
        <div className={style.pvz}>
          <label htmlFor="pvz1">
            Name of PVZ1
            <input
              type="text"
              id="pvz1"
              value={pvz1Name}
              onChange={(e) => setPvz1Name(e.target.value)}
            />
          </label>
        </div>
        <div className={style.pvz}>
          <label htmlFor="pvz2">
            Name of PVZ2
            <input
              type="text"
              id="pvz2"
              value={pvz2Name}
              onChange={(e) => setPvz2Name(e.target.value)}
            />
          </label>
          <button onClick={setChange}>Save</button>
        </div>
      </div>
      <div className={style.themeWrap}>
        {theme === "light" ? "О как светло" : "Темно тут у вас"}
        <Switch
          {...label}
          value={theme}
          onChange={toggleTheme}
          defaultChecked
        />
      </div>
    </div>
  );
};
export default Settings;
