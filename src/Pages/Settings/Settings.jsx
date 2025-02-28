import { useState, useEffect } from "react";

import style from "./Settings.module.scss";

const Settings = () => {
  const [pvz1Name, setPvz1Name] = useState("ПВЗ1");
  const [pvz2Name, setPvz2Name] = useState("ПВЗ2");

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

  const setChange = () => {
    localStorage.setItem("pvz1name", pvz1Name);
    localStorage.setItem("pvz2name", pvz2Name);
  };

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
    </div>
  );
};
export default Settings;
