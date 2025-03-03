import { useState } from "react";
import { nanoid } from "nanoid";
import PopUp from "./PopUp";

import style from "./ItemList.module.scss";

const dayOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const ItemList = ({
  checkPVZ,
  currentWeek,
  callBackNewEvent,
  setTextAlert,
  setShowAlert,
}) => {
  const [currentDay, setCurrentDay] = useState([]);
  const [handlePopUp, setHandlePopUp] = useState(false);

  const popUp = (day) => {
    setCurrentDay(day);
    setHandlePopUp(true);
  };

  return (
    <>
      <ul className={style.itemList}>
        {currentWeek.length &&
          currentWeek.map((day, index) => (
            <li
              className={style.item}
              key={nanoid()}
              onClick={() => popUp(day)}
            >
              <div className={style.dayOfWeek}>
                <p className={style.itemDayofWeek}>{dayOfWeek[index]}</p>
                <p className={style.itemDay}>{day.date.slice(0, 2)}</p>
              </div>
              {day.data.length ? (
                <ul className={style.itemInfoList}>
                  {day.data.map((item) => (
                    <li className={style.itemInfo} key={nanoid()}>
                      <p className={style.startTime}>
                        {item.startTime}-{item.endTime}
                      </p>
                      <p
                        className={style.itemColor}
                        style={{ backgroundColor: item.color }}
                      >
                        {item.namePerson.slice(0, 2)}
                      </p>
                      <p className={style.namePerson}>{item.namePerson}</p>
                      <p className={style.sumOfTime}>
                        {Number(item.endTime.slice(0, 2)) -
                          Number(item.startTime.slice(0, 2))}
                        ч{" "}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>нет данных</div>
              )}
            </li>
          ))}
        <div className={style.swipeHelper}>
          <svg
            fill="var(--text)"
            viewBox="0 0 1000 1000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 1000 1000"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                  <path d="M4128.9,4247.8L4010.1,4129l247.5-247.5L4505,3634l-1356.2-4l-1356.2-5.9l-5.9-162.3l-5.9-164.3H3139c746.4,0,1356.2-5.9,1356.2-13.9c0-7.9-108.9-124.7-241.5-257.4l-243.5-243.5l118.8-118.8l118.8-118.8l459.3,459.3l461.3,461.3l-449.4,449.4c-247.5,249.4-455.4,451.4-461.3,451.4C4251.6,4366.6,4194.2,4313.1,4128.9,4247.8z"></path>{" "}
                  <path d="M559.3,3232.1L100,2772.8l455.4-455.4l455.4-455.4l122.7,124.7l124.7,122.7l-247.5,247.5l-247.5,247.5l1356.2,4l1356.2,5.9l5.9,164.3l5.9,162.3h-1372h-1372l257.4,257.4l257.4,257.4l-118.8,118.8l-118.8,118.8L559.3,3232.1z"></path>{" "}
                  <path d="M5827.6,3422.2l-322.7-188.1V1915.6l-2-1320.5l-667.2-475.1l-667.2-477.1l-5.9-823.6l-4-823.6l667.2-1071.1L5495-4146.6h196c146.5,0,192,5.9,184.1,25.7c-4,11.9-316.8,516.7-694.9,1118.6l-685,1096.8v685l2,687l487,346.5c269.2,190.1,495,350.4,504.8,352.4c7.9,4,15.8-354.4,15.8-795.9v-803.8h168.3h168.3l4,2241.1l5.9,2239.1l164.3,97l162.3,97l168.3-95l168.3-95V1650.3V248.6h168.3h168.3v336.6v336.6l75.2,47.5c41.6,25.7,120.8,73.3,174.2,103l97,53.5l164.3-95l162.3-95V593.1V248.6h178.2h178.2v186.1c0,289.1-2,285.1,188.1,394l164.3,93.1l168.3-99l166.3-97l-9.9-239.6l-9.9-237.6h170.3h170.3l5.9,172.2l5.9,170.3l158.4,95c176.2,102.9,146.5,106.9,372.2-27.7l132.7-77.2V-440.4V-1460l-336.6-898.8l-336.6-896.9v-445.4v-445.4h168.3h168.3v413.8v411.8l336.6,896.9l336.6,896.8V-377V773.2l-334.6,194c-182.1,104.9-338.5,192-344.5,192c-7.9,0-81.2-39.6-164.3-89.1c-81.2-49.5-158.4-89.1-170.3-89.1c-9.9,0-162.3,73.3-336.6,162.3L8231,1305.8l-101-57.4c-55.4-31.7-132.6-75.2-170.3-97l-71.3-37.6l-285.1,164.3c-158.4,89.1-314.8,180.2-346.5,200l-59.4,35.6l-168.3-97l-168.3-97l-9.9,962.2l-9.9,962.2l-316.8,184.1c-174.2,101-330.6,184.1-346.5,184.1S6003.8,3527.1,5827.6,3422.2z"></path>{" "}
                </g>
              </g>
            </g>
          </svg>
        </div>
      </ul>
      <PopUp
        checkPVZ={checkPVZ}
        day={currentDay}
        handlePopUp={handlePopUp}
        setHandlePopUp={setHandlePopUp}
        callBackNewEvent={callBackNewEvent}
        setTextAlert={setTextAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default ItemList;
