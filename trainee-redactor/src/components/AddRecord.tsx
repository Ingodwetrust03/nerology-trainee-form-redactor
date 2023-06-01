import React, {useState} from "react";
import {Trainee} from "../models";
import {nanoid} from "nanoid";
import dayjs from "dayjs";

interface Props {
    onAddRecord: (trainee: Trainee) => void,
   /* onEditRecord: (trainee: Trainee) => void,*/
    recordToEdit: Trainee
}

export default function AddRecord ({onAddRecord/*, onEditRecord*/, recordToEdit}: Props) {

    const [record, setRecord] = useState(
        {
            date: "",
            distance: '',
        }
    );


    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setRecord({...record, [name]: value});
        //смущает, что здесь меняю значение, а состояние recordToEdit объявлено в компоненте Trainees
        recordToEdit.date = "";
        recordToEdit.distance = "";
    }



    const addNewRecord = (e) => {
        e.preventDefault();
        const newRecord: Trainee = {
            id: nanoid(),
            date: dayjs(record.date).format('DD.MM.YYYY'),
            distance: record.distance,
        }
        onAddRecord(newRecord);
        setRecord({
            date: "",
            distance: ""
        })
    }

    return (
        <form onSubmit={addNewRecord}>
            <div>
                <label htmlFor="date">Date</label>
                {/*когда в этот инпут подставляется значение из RecordToEdit.date то день и месяц меняются местами, не пойму почему*/}
                <input type="date" name="date" id="date" value={recordToEdit.date === "" ? record.date : recordToEdit.date} onChange={getValue} />
            </div>
            <div>
                <label htmlFor="distance">Distance</label>
                <input type="text" name="distance" id="distance" value={recordToEdit.distance === "" ? record.distance : recordToEdit.distance}  onChange={getValue}/>
            </div>
            <button type="submit">OK</button>
        </form>
    )
}