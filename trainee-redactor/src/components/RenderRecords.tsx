
import {Trainee} from "../models";

interface Props {
    records: Trainee[],
    onRemoveRecord: (recordId: string) => void,
    onEditRecord: (recordId: string) => void
}

export default function RenderRecords ({records, onRemoveRecord, onEditRecord}: Props) {
    return (
        <div className="trainees">
            {records.map(record => (
                <div key={record.id}>
                    <p>{record.date}</p>
                    <p>{record.distance}</p>
                    <div className="btns-row">
                        <i className="material-icons" onClick={() => onEditRecord(record.id)}>edit</i>
                        <i className="material-icons" onClick={() => onRemoveRecord(record.id)}>delete</i>
                    </div>
                </div>
            ))}
        </div>
    )
}