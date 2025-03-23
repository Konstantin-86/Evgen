import axios from "axios";
import { PVZ3API } from "../variables";

export const getPVZ3 = async () => {

    try {
        const response = await axios.get(PVZ3API);
        console.log("запрос за PVZ3");
        return response.data;
    } catch (error) {
        alert("Запрос не удался", error);
    }

};