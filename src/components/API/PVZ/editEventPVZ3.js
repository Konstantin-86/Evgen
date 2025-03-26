import axios from "axios";
import { PVZ3API } from "../variables";

export const editEventPVZ3 = async (data) => {
  const path = `${PVZ3API}/${data.id}`;
  try {
    await axios
      .patch(path, data)
      .then((res) => console.log("Данные успешно изменились на серв", res));
  } catch (error) {
    alert("Запрос не удался", error);
  }
};
