import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddSemples from './AddSemples';
import { useData } from '../../components/API/FetchSemples';
import style from './Semples.module.scss'
import { nanoid } from 'nanoid';

const Semples = () => {
  const [showAddSemples, setShowAddSemples] = useState(false);
  const {loading , data}= useData()
    return (
        <div >
            <h1>Semples</h1>
            <ul className={style.list}>
              {loading ? 
              <li>loading</li>
            : data.length && data.map((item)=> (
              <li key={nanoid()} className={style.item}>
                <p>{item.namePerson}</p>
                <p>{item.color}</p>
                <p>{item.startTime} - {item.endTime}</p>
                <p>{item.currentRate} руб</p>
              </li>
            ))
            }
            </ul>
           <button onClick={() => setShowAddSemples(!showAddSemples)}>
               <AddCircleIcon   />
           </button>
           <AddSemples data={data} showAddSemples={showAddSemples} setShowAddSemples={setShowAddSemples} />
        </div>
    )
}
export default Semples