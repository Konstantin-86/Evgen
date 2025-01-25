import axios from "axios";
import { PersonsAPI } from "../variables";

export const addNewSemple = (newUser) => {
    axios.post(PersonsAPI, newUser)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}