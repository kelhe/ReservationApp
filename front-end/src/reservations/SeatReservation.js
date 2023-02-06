import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { seatReservationAt } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation({tables,reservationsError, setReservationsError,render,setRender}){
const history = useHistory();
const {reservation_id} = useParams();
const [tableId,setTableId] = useState("")


const tableOptions = tables.map((table)=>(
    <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
    </option>
))

const handleChange = ({target}) => {
    setTableId(Number(target.value))
}

const handleSubmit = async (event) => {
    const abortController = new AbortController();
    try {
        event.preventDefault();
        await seatReservationAt(reservation_id,tableId,abortController.signal)
        setRender(!render)
        history.push("/dashboard")
    } catch(error) {
        setReservationsError(error)
    }
}

return (
    <div>
        <h1>Seat Reservation</h1>
        <ErrorAlert error={reservationsError} setReservationsError={setReservationsError}/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="table_id">
                Choose Table:   
            </label>
            <select
            name="table_id"
            id="table_id"
            value={tableId}
            onChange={handleChange}
            required>
                <option value="">--Please choose an option--</option>
                {tableOptions}
            </select>
            <button type="button" onClick={() => history.go(-1)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
        </form>
    </div>
)
}

export default SeatReservation