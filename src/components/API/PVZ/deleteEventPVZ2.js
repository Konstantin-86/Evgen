import axios from "axios";
import { PVZ2API } from "../variables";

export const deleteEventPVZ2 = async (data) => {
    try {
        await axios.delete(PVZ2API, data).then(() => console.log("Данные успешно удалены с сервера"));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};