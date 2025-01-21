import { useState } from 'react'
import styles from '../styles/PersonSemples.module.scss'





const PersonSemples = ({ personSemplesAPI }) => {

    const [newPerson, setNewPerson] = useState("")
    const [handleAddPersonPopup, setHandleAddPersonPopup] = useState(false)
    const [personSemplesListStyle, setPersonSemplesListStyle] = useState(false)
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: true,
        checkbox2: false,
        checkbox3: false,
    });
    return (
        <div className={styles.item}>
            <h4 className={styles.title}>Шаблоны</h4>
            <div className={styles.wrapper}>
                {personSemplesAPI.map((item) => (
                    <div className={styles.itemInfo} key={item.id}>
                        <div className={styles.itemColor} style={{ backgroundColor: item.color }}>{item.namePerson.slice(0, 2)}</div>
                        <div className={styles.itemName}>{item.namePerson}</div>
                        <div className={styles.itemTime}>{item.startTime} - {item.endTime}</div>
                        <div className={styles.itemBidRubles}>{item.bidRubles} руб/час</div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default PersonSemples