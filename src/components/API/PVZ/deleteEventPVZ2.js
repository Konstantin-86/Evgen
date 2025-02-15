import axios from "axios";
import { PVZ2API } from "../variables";

export const deleteEventPVZ2 = async (id) => {
    const path = `${PVZ2API}/${id}`
    try {
        await axios.delete(path).then(() => console.log("Данные успешно удалены с сервера"));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};