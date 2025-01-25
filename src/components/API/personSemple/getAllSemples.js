import axios from "axios";
import { PersonsAPI } from "../variables";

export const getAllSemples = async () => {
    try {
        const response = await axios.get(PersonsAPI);
        console.log("запрос за Persons");
        return response.data;
    } catch (error) {
        alert("Запрос не удался", error);
    }

};