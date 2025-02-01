import axios from "axios";
import { PVZ1API } from "../variables";

export const addNewEventPVZ1 = async (data) => {
    try {
        await axios.post(PVZ1API, data).then(res => console.log("Данные успешно улетели на серв", res));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};

