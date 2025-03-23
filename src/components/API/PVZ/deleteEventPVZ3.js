import axios from "axios";
import { PVZ3API } from "../variables";

export const deleteEventPVZ3 = async (id) => {
    const path = `${PVZ3API}/${id}`
    try {
        await axios.delete(path)
            .then(() => console.log("Данные успешно удалены с сервера"));
    } catch (error) {

        console.log(error);

    }
};