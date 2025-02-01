import axios from "axios";
import { PVZ2API } from "../variables";

export const addNewEventPVZ2 = async (data) => {
    try {
        await axios.post(PVZ2API, data).then(res => console.log("Данные успешно улетели на серв", res));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};