import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const SemplesContext = createContext();
const API = "https://694548aefb424dc0.mokky.dev/persons"

// Провайдер контекста
export const FetchSemples = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки данных
  const fetchData = async () => {
    try{await axios.get(API)
        .then((res)=> setData(res.data))
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> setLoading(false));}
        catch (error) {
          setError(error);
        }
         
    }


  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchData();
  }, []);

  // Значение, которое будет доступно всем компонентам
  const value = { data, loading, error };
console.log(data);

  return <SemplesContext.Provider value={value}>{children}</SemplesContext.Provider>;
};


export const useData = () => {
  const context = useContext(SemplesContext);
  if (!context) {
    throw new Error('useData должен использоваться внутри DataProvider');
  }
  return context;
};