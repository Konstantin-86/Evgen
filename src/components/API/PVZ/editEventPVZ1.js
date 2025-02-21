import axios from "axios";
import { PVZ1API } from "../variables";

export const editEventPVZ1 = async (data) => {
    const path = `${PVZ1API}/${data.id}`
    console.log(path);
    
    
    try {
        await axios.patch(path, data).then(res => console.log("Данные успешно изменились на серв", res));
    } catch (error) {
        alert("Запрос не удался", error);
    }
};