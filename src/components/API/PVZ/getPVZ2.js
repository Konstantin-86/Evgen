import axios from "axios";
import { PVZ2API } from "../variables";

export const getPVZ2 = async () => {
    try {
        const response = await axios.get(PVZ2API);
        console.log("запрос за PVZ2");
        return response.data;
    } catch (error) {
        alert("Запрос не удался", error);
    }

};