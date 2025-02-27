import axios from "axios";
import { PVZ2API } from "../variables";

export const editEventPVZ2 = async (data) => {
    const path = `${PVZ2API}/${data.id}`
    try {
        await axios.patch(path, data).then(res => console.log("Данные успешно изменились на серв", res));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};