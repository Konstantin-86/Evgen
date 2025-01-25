import axios from "axios";
import { PersonsAPI } from "../variables";


export const deleteSemple = (id) => {
    axios.delete(`${PersonsAPI}/${id}`)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}