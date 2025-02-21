import axios from "axios";
import { PVZ2API } from "../variables";

export const editEventPVZ2 = async (data) => {
    try {
        await axios.patch(PVZ2API, data).then(res => console.log("Данные успешно изменились на серв", res));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};