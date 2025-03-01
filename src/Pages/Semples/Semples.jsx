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
      let maxId = 0;
      data.forEach((item) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      })
      setNumberID(maxId);
    }
  }, [isLoading, data]);



  const deleteMutation = useMutation({
    mutationFn: deleteSemple,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['semples'], (oldData) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });
  const deletePerson = (id) => {
    deleteMutation.mutate(id)
  }

  return (
    <div className={style.wrap} >
      <div className={style.container}>
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
                <div className={style.deleteIcon} onClick={() => deletePerson(item.id)}>
                  <DeleteOutlineIcon />
                </div>
              </li>
            ))
          }
        </ul>
        <button className={style.addButton} onClick={() => setShowAddSemples(!showAddSemples)}>Добавить шаблон</button>
        <AddSemples numberID={numberID} showAddSemples={showAddSemples} setShowAddSemples={setShowAddSemples} />
      </div>
    </div>
  )
}
export default Semples