
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { MuiColorInput } from 'mui-color-input'

import style from './AddSemples.module.scss'
import { nanoid } from 'nanoid';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPersonSemple } from '../../components/API/myFetch';

const time = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
  "21:00"
]

const AddSemples = ({  showAddSemples, setShowAddSemples}) => {
  const [newPersonName, setNewPersonName] = useState("")
  const [newPersonColor, setNewPersonColor] = useState('#ffffff')
  const [newPersonStartTime, setNewPersonStartTime] = useState('')
  const [newPersonEndTime, setNewPersonEndTime] = useState('')
  const queryClient = useQueryClient()
  
    const handleChangeColor = (newValue) => {
      setValueColor(newValue)
    }

  const handleChange = (event) => {
    setNamePerson(event.target.value);
  };


  const createMutation = useMutation({
    mutationFn: addPersonSemple,
    onSuccess: (_, newUser) => {
      queryClient.setQueryData(['semples'], (oldData) => {
        return [...oldData, newUser];
      });
    },
  })

  const handleAddUser = () => {
      const newUser = {
        "id": 3,
        "namePerson": "Виктор adsf",
        "startTime": "09:00",
        "endTime": "15:00",
        "currentRate": 100,
        "color": "#33c926c9"
    };
    
    createMutation.mutate(newUser);
    };
  
  
    return (
        <div className={showAddSemples ? style.addSemplesOpen : style.addSemplesClose}>
          <div className={style.wrap}>
          <label htmlFor="username">Имя</label>
          <input type="text" id='username'  placeholder='' value={newPersonName} onChange={(e)=> setNewPersonName(e.target.value)}/>

          <label htmlFor="userColor">Цвет</label>
          <input type="color" id='userColor'  placeholder='' value={newPersonColor} onChange={(e)=> setNewPersonColor(e.target.value)}/>

          <select name="startTime" value={newPersonStartTime} onChange={(e)=> setNewPersonStartTime(e.target.value)}>
            {time.map((elem)=> (<option key={nanoid()} value={elem}>{elem}</option>) )}
</select>
          <button onClick={handleAddUser}>ADD</button>
          </div>
            
        </div>
    )
}
export default AddSemples