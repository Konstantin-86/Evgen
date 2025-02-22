import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { getAllSemples } from '../../components/API/personSemple/getAllSemples'
import { deleteSemple } from '../../components/API/personSemple/deleteSemple'
import AddSemples from './AddSemples';

import style from './Semples.module.scss'

const Semples = () => {
  const queryClient = useQueryClient()
  const [showAddSemples, setShowAddSemples] = useState(false);
  const [numberID, setNumberID] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['semples'],
    queryFn: getAllSemples,
  });
  
  useEffect(() => {
    if (!isLoading && data) {
      setNumberID(data.length);
    }
  }, [isLoading, data]);



  const deleteMutation = useMutation({
    mutationFn: deleteSemple,
    onSuccess: (_, idPerson) => {
      queryClient.setQueryData(['semples'], (oldData) => {
        return oldData.filter((item) => item.idPerson !== idPerson);
      });
    },
  });
  const deletePerson = (idPerson) => {
    deleteMutation.mutate(idPerson)
  }

  return (
    <div className={style.wrap} >
      <h1>Шаблоны</h1>

      <ul className={style.list}>
        {isLoading
          ?
          <p>Loading...</p>
          :
          data.map((item) => (
            <li key={nanoid()} className={style.item} >

              <p className={style.itemName}>{item.namePerson}</p>
              <p className={style.itemColor} style={{ backgroundColor: item.color }}></p>

              <p>{item.startTime} - {item.endTime}</p>
              <p>{item.currentRate} руб</p>
              <div className={style.deleteIcon} onClick={() => deletePerson(item.idPerson)}>
                <DeleteOutlineIcon />
              </div>

            </li>
          ))
        }
      </ul>
      <button className={style.button} onClick={() => setShowAddSemples(!showAddSemples)}>Добавить шаблон</button>
      <AddSemples numberID={numberID} showAddSemples={showAddSemples} setShowAddSemples={setShowAddSemples} />

    </div>
  )
}
export default Semples