import axios from "axios";
import { PersonsAPI } from "../variables";


export const deleteSemple = (id) => {
    const path = `${PersonsAPI}/${id}`
    console.log(path);


    axios.delete(`${PersonsAPI}/${id}`)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}