import { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPVZ1 } from '../../components/API/PVZ/getPVZ1';
import { getPVZ2 } from '../../components/API/PVZ/getPVZ2';
import { addNewEventPVZ1 } from "../../components/API/PVZ/addNewEventPVZ1"
import { addNewEventPVZ2 } from "../../components/API/PVZ/addNewEventPVZ2"

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'moment/locale/ru';
import ItemList from './ItemList';
import 'react-calendar/dist/Calendar.css';
import styles from './Main.module.scss';


const Main = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());
  const [weekData, setWeekData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const [alignment, setAlignment] = useState('PVZ1');
  const [checkPVZ, setCheckPVZ] = useState('PVZ1');

  const handleChange = (event) => {
    setAlignment(event.target.value);
  };
  const getToggleButtonStyles = (value, alignment) => ({
    backgroundColor: alignment === value ? '#3a393a' : '#1f1e1f',
    color: alignment === value ? '#f1f0f0' : '#7e7b7b',
    '&:hover': {
      backgroundColor: alignment === value ? '#388e3c' : '#bdbdbd',
    },
  });

  const { data: PVZ1, isLoading: isLoadingPVZ1 } = useQuery({
    queryKey: ['PVZ1'],
    queryFn: getPVZ1,
  });
  const { data: PVZ2, isLoading: isLoadingPVZ2 } = useQuery({
    queryKey: ['PVZ2'],
    queryFn: getPVZ2,
  });

  useEffect(() => {
    if (!isLoadingPVZ1 && PVZ1 && Array.isArray(PVZ1)) {
      const currentPVZ = alignment === 'PVZ1' ? PVZ1 : PVZ2;
      const startOfWeek = moment(date).startOf('week');
      const endOfWeek = moment(date).endOf('week');
      const weekDays = [];
      let currentDay = startOfWeek;

      while (currentDay <= endOfWeek) {
        const formattedDate = currentDay.format('DD.MM.YYYY');
        const dayData = currentPVZ.find(item => item[formattedDate]);

        weekDays.push({
          date: currentDay.toDate(),
          dayOfWeek: currentDay.format('dd'),
          data: dayData ? dayData[formattedDate] : []
        });

        currentDay = currentDay.clone().add(1, 'd');
      }

      setWeekData(weekDays);
    }
  }, [date, PVZ1, PVZ2, alignment]);


  const createMutation = useMutation({
    mutationFn: (newUser) => {
      const checkPVZ = alignment === 'PVZ1' ? addNewEventPVZ1 : addNewEventPVZ2
      return checkPVZ(newUser)
    },
    onSuccess: (_, newUser) => {
      queryClient.setQueryData([alignment], (oldData) => {
        return [...oldData, newUser];
      });
    },
  })

  const callBackNewEvent = (data) => {
    console.log(data);

    createMutation.mutate(data);
  }
  return (

    <div>
      <h2 onClick={() => setShowCalendar(!showCalendar)}>Календарь</h2>
      <ToggleButtonGroup
        color='info'
        value={alignment}
        onChange={(event) => handleChange(event)}
        sx={{
          backgroundColor: '#363636',
          color: 'white',
        }
        }
      >
        <ToggleButton sx={getToggleButtonStyles('PVZ1', alignment)} value="PVZ1">ПВЗ №1</ToggleButton>
        <ToggleButton sx={getToggleButtonStyles('PVZ2', alignment)} value="PVZ2">ПВЗ №2</ToggleButton>
      </ToggleButtonGroup>
      <Calendar
        className={showCalendar ? styles.showCalendar : styles.hideCalendar}
        onChange={setDate}
        value={date}
      />
      <div>
        <ItemList weekData={weekData} callBackNewEvent={callBackNewEvent} />
      </div>
    </div>
  );
};

export default Main;