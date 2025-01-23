
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


const time = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
  "21:00"
]


const AddSemples = ({data, showAddSemples, setShowAddSemples}) => {
    const [namePerson, setNamePerson] = useState('');
    const [valueColor, setValueColor] = useState('#ffffff')
    const handleChangeColor = (newValue) => {
      setValueColor(newValue)
    }

  const handleChange = (event) => {
    setNamePerson(event.target.value);
  };
    return (
        <div className={showAddSemples ? style.addSemplesOpen : style.addSemplesClose}>
            <HighlightOffIcon onClick={() => setShowAddSemples(!showAddSemples)}/>
             <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Имя</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={namePerson}
          label="Age"
          onChange={handleChange}
        >
          {data?.length && data.map((elem)=> (
            <MenuItem key={nanoid()} value={elem.namePerson}>{elem.namePerson}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <MuiColorInput fullWidth format="hex" value={valueColor} onChange={handleChangeColor} />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Время начала</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={namePerson}
          label="Age"
          onChange={handleChange}
        >
          {time.map((elem)=> (
            <MenuItem key={nanoid()} value={elem}>{elem}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
        </div>
    )
}
export default AddSemples