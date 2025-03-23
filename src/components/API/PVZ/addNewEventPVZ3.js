import axios from "axios";
import { PVZ3API } from "../variables";

export const addNewEventPVZ3 = async (data) => {
    try {
        await axios.post(PVZ3API, data).then(res => console.log("Данные успешно улетели на серв", res));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};

