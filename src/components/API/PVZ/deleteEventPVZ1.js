import axios from "axios";
import { PVZ1API } from "../variables";

export const deleteEventPVZ1 = async (id) => {
    const path = `${PVZ1API}/?id=${id}`
    console.log(path);
    
    
    try {
        await axios.delete(path)
        .then(() => console.log("Данные успешно удалены с сервера"));
    } catch (error) {
        
        console.log(error);
        
    }
};