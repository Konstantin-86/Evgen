import axios from "axios";

const PersonsAPI = 'https://694548aefb424dc0.mokky.dev/persons';
export const fetchSemples = async () => {
  try{
    const response = await axios.get(PersonsAPI);
 console.log("запрос за Persons");
  return response.data;
  } catch (error) {
    alert("Запрос не удался", error);
  }
 
  };
  export const addPersonSemple =  (newUser)=> {
    axios.post(PersonsAPI, newUser)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  export const deletePersonSemple =  (id)=> {
    axios.delete(`${PersonsAPI}/${id}`)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
};

const fetchComments = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  return response.json();
};

