import {useState} from "react";
import {nanoid} from "nanoid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {Trainee} from "../models";
import RenderRecords from "./RenderRecords";
import AddRecord from "./AddRecord";




export default function Trainees() {
    dayjs.extend(customParseFormat);

    const traineesStore: Trainee[] = [
        {
            id: nanoid(),
            date: dayjs("2019-07-20").format('DD.MM.YYYY'),
            distance: '5.7',
        },
        {
            id: nanoid(),
            date: dayjs("2019-07-19").format('DD.MM.YYYY'),
            distance: '14.2',
        },
        {
            id: nanoid(),
            date: dayjs("2019-07-18").format('DD.MM.YYYY'),
            distance: '3.4',
        }
    ]

    const [trainees, setTrainees] = useState(traineesStore);

    const addNewRecord = (newRecord: Trainee) => {
        setTrainees( (prevState) => {
            let sortedArray = [...prevState, newRecord].sort((a, b) => (dayjs(a.date, "DD.MM.YYYY").isBefore(dayjs(b.date, "DD.MM.YYYY")) ? 1 : -1));
            return sortedArray
        });
    }


    const deleteRecord = (recordId: string) => {
        setTrainees((prevState) => {
            return [...prevState.filter((record) => record.id!== recordId)]
        })
    }

    const newRecordToEdit: Trainee = {
        id: "",
        date: "",
        distance: ""
    }


    //эту часть 57-67 по логике нужно перенести в компонент AddRecord, но как перебрасывать запись по айди, значения которой должны отобразиться в качестве value у
    //инпутов, получаем ее ведь поклику из другого компонента RenderRecords? а здесь оставить только 70-72 строки - состояние стейта trainees
    const [recordToEdit, setRecordToEdit] = useState(newRecordToEdit);


    const editRecord = (recordId: string) => {
         trainees.filter((record) => {
             if(record.id == recordId) {
                 setRecordToEdit((prevState) => {
                     return {...prevState, id: record.id, date: dayjs(record.date).format("YYYY-MM-DD"), distance: record.distance}
                 })
             }
         })

        setTrainees((prevState) => {
            return [...prevState.filter((record) => record.id!== recordId)]
        })

    }



    return (
        <>
        <AddRecord onAddRecord={addNewRecord} recordToEdit={recordToEdit} />

            <div className="trainees-heading">
                <div>Дата (ДД.ММ.ГГ)</div>
                <div>Пройдено км</div>
                <div>Действия</div>
            </div>

            <RenderRecords records={trainees} onRemoveRecord={deleteRecord}  onEditRecord={editRecord}/>
        </>
    )
}

