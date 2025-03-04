import axios from "axios";
import { PersonsAPI } from "../variables";

export const editSemple = async (data) => {
  const path = `${PersonsAPI}/${data.id}`;
  console.log(path);

  try {
    await axios
      .patch(path, data)
      .then((res) => console.log("Данные успешно изменились на серв", res));
  } catch (error) {
    alert("Запрос не удался", error);
  }
};
