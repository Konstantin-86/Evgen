import axios from "axios";
import { PVZ1API } from "../variables";

export const getPVZ1 = async () => {
    try {
        const response = await axios.get(PVZ1API);
        console.log("запрос за PVZ1");
        return response.data;
    } catch (error) {
        alert("Запрос не удался", error);
    }

};