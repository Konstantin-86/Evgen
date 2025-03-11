import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { getAllSemples } from "../../components/API/personSemple/getAllSemples";

import styles from "./SempleList.module.scss";

const SempleList = ({
  selectedItems,
  setSelectedItems,
  addNewDay,
  maxId,
  setMaxId,
}) => {
  const { data } = useQuery({
    queryKey: ["semples"],
    queryFn: getAllSemples,
  });

  const isItemSelected = (item, selectedItems) => {
    return selectedItems.some(
      (selectedItem) =>
        selectedItem.namePerson === item.namePerson &&
        selectedItem.startTime === item.startTime &&
        selectedItem.endTime === item.endTime
    );
  };

  const handleClick = (item) => {
    /* const isSelected = isItemSelected(item, selectedItems);
        if (isSelected) {
            setSelectedItems([]);
            setMaxId(maxId - 1);
        } else { } */

    const newItem = {
      ...item,
      id: maxId + 1,
      otherData: item.otherData || { fines: 0, bonus: 0 },
    };
    /* setSelectedItems([newItem]);
    setMaxId(maxId + 1); */
    addNewDay(newItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sempleList}>
        {data.map((item) => (
          <div
            key={nanoid()}
            className={styles.semple}
            onClick={() => handleClick(item)}
            style={{
              backgroundColor: isItemSelected(item, selectedItems)
                ? "var(--accent)"
                : "var(--secondary-background)",
            }}
          >
            <p className={styles.sempleName}>{item.namePerson}</p>
            <p
              className={styles.sempleColor}
              style={{ backgroundColor: item.color }}
            ></p>
            <p>
              {item.startTime} - {item.endTime}
            </p>
            <p>{item.currentRate} руб</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SempleList;
