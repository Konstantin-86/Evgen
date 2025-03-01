import { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';

import style from "./Settings.module.scss";

const Settings = () => {
  const [pvz1Name, setPvz1Name] = useState("ПВЗ1");
  const [pvz2Name, setPvz2Name] = useState("ПВЗ2");
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setChange = () => {
    localStorage.setItem("pvz1name", pvz1Name);
    localStorage.setItem("pvz2name", pvz2Name);
  };

  // При изменении темы обновляем localStorage и атрибут data-theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Сохраняем тему в localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className={style.settings}>
      <div className={style.pvzWrapper}>
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
        Тема: {theme === "light" ? "Светлая" : "Темная"}
        <Switch {...label} value={theme} onChange={toggleTheme} defaultChecked />
      </div>
    </div>
  );
};
export default Settings;
