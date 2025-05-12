import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";

import style from "./Settings.module.scss";
const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className={style.settings}>
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
