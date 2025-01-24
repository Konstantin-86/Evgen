import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddSemples from './AddSemples';
import style from './Semples.module.scss'
import { nanoid } from 'nanoid';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSemples } from '../../components/API/myFetch.js';
import { addPersonSemple, deletePersonSemple } from '../../components/API/myFetch';


const Semples = () => {
  const [showAddSemples, setShowAddSemples] = useState(true);
  const { data: newMyData , isLoading, error } = useQuery({
    queryKey: ['semples'], 
    queryFn: fetchSemples,
  });
  const queryClient = useQueryClient()


  
  const deleteMutation = useMutation({
    mutationFn: deletePersonSemple,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['semples'], (oldData) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });
const deletePerson = (id)=> {
deleteMutation.mutate(id)

}
  
    return (
        <div >
            <h1>Шаблоны</h1>
            
            <ul className={style.list}>
              {isLoading 
              ?
               <p>Loading...</p> 
              :
              newMyData.map((item)=> (
              <li key={nanoid()} className={style.item} onClick={()=> deletePerson(item.id)}>
                <p>{item.namePerson}</p>
                <p>{item.color}</p>
                <p>{item.startTime} - {item.endTime}</p>
                <p>{item.currentRate} руб</p>
              </li>
            ))
            }
            </ul>
          <AddSemples showAddSemples={showAddSemples} setShowAddSemples={setShowAddSemples}/>
            
        </div>
    )
}
export default Semples