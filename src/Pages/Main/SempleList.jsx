import {useState} from 'react'
import { nanoid } from 'nanoid'
import { useQuery } from '@tanstack/react-query';
import { getAllSemples } from '../../components/API/personSemple/getAllSemples';

import styles from './SempleList.module.scss'

const SempleList = ({ selectedItems, setSelectedItems, addNewDay }) => {
  

    const { data, isLoading } = useQuery({
        queryKey: ['semples'],
        queryFn: getAllSemples,
    });

    const handleClick = (item) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
        } else {
            const newItem = {
                ...item,
                otherData: item.otherData || { fines: 0, bonus: 0 },
            };
            setSelectedItems([...selectedItems, newItem]);
        }
    };

    
  return (
    <div className={styles.sempleList}>
        {data.map((item) => (
            <div key={nanoid()}
                className={styles.semple}
                onClick={() => handleClick(item)}
                style={{
                backgroundColor: selectedItems.some((selectedItem) => selectedItem.id === item.id)
                    ? '#3c6112'
                    : '#474747',
                }}>
                    <p className={styles.sempleName}>{item.namePerson}</p>
                    <p className={styles.sempleColor} style={{ backgroundColor: item.color }}></p>
                    <p>{item.startTime} - {item.endTime}</p>
                    <p>{item.currentRate} руб</p>
            </div>
        ))}
            {data.length === 0 
                ? 
                <p>Нет шаблонов</p>
                : 
                <button className={styles.buttonAdd} onClick={addNewDay}>Сохранить</button>  }
                                            
    </div>
  )
}

export default SempleList