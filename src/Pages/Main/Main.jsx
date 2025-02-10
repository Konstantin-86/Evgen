import { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPVZ1 } from '../../components/API/PVZ/getPVZ1';
import { getPVZ2 } from '../../components/API/PVZ/getPVZ2';
import { addNewEventPVZ1 } from "../../components/API/PVZ/addNewEventPVZ1"
import { addNewEventPVZ2 } from "../../components/API/PVZ/addNewEventPVZ2"

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Alert } from '@mui/material'
import 'moment/locale/ru';
import ItemList from './ItemList';
import 'react-calendar/dist/Calendar.css';
import styles from './Main.module.scss';

//////////////
import getCurrentWeek from "./helpers/getCurrentWeek.js"


const Main = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());

  const [currentWeek, setCurrentWeek] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const [checkPVZ, setCheckPVZ] = useState('PVZ1');

  const handleChange = (event) => {
    setCheckPVZ(event.target.value);
  };

  const getToggleButtonStyles = (value, checkPVZ) => ({
    backgroundColor: checkPVZ === value ? '#3a393a' : '#1f1e1f',
    color: checkPVZ === value ? '#f1f0f0' : '#7e7b7b',
    '&:hover': {
      backgroundColor: checkPVZ === value ? '#388e3c' : '#bdbdbd',
    },
  });
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);

    }
  }, [showAlert]);

  const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
    queryKey: ['PVZ1'],
    queryFn: getPVZ1,
  });

  const { data: PVZ2, isLoading: isLoadingPVZ2 } = useQuery({
    queryKey: ['PVZ2'],
    queryFn: getPVZ2,
  });


  useEffect(() => {
    if (PVZ1 && !isLoadingPVZ1 && PVZ2 && !isLoadingPVZ2) {
      const checkPVZValue = checkPVZ === 'PVZ1' ? PVZ1 : PVZ2
      const getWeek = getCurrentWeek(checkPVZValue)
      console.log(getWeek);
      setCurrentWeek(getWeek);
    }
  }, [checkPVZ, PVZ1, PVZ2, isLoadingPVZ1, isLoadingPVZ2]);





  const createMutation = useMutation({
    mutationFn: (newUser) => {
      const checkPVZ = checkPVZ === 'PVZ1' ? addNewEventPVZ1 : addNewEventPVZ2
      return checkPVZ(newUser)
    },
    onSuccess: (_, newUser) => {
      queryClient.setQueryData([checkPVZ], (oldData) => {
        setShowAlert(true);
        return [...oldData, newUser];
      });
    },
  })

  const callBackNewEvent = (data) => {
    createMutation.mutate(data);
  }

  return (

    <div>
      {showAlert && <Alert severity="success" >
        Данные успешно добавлены
      </Alert>}
      <ToggleButtonGroup
        color='info'
        value={checkPVZ}
        onChange={(event) => handleChange(event)}
        sx={{
          backgroundColor: '#363636',
          color: 'white',
        }
        }
      >
        <ToggleButton sx={getToggleButtonStyles('PVZ1', checkPVZ)} value="PVZ1">ПВЗ №1</ToggleButton>
        <ToggleButton sx={getToggleButtonStyles('PVZ2', checkPVZ)} value="PVZ2">ПВЗ №2</ToggleButton>
      </ToggleButtonGroup>

      <div>
        <ItemList currentWeek={currentWeek} callBackNewEvent={callBackNewEvent} />
      </div>
    </div>
  );
};

export default Main;