import React from "react"
import { formatAs12Hr } from "../utils/date-time"

function Reservations({reservations}){
    const rows = reservations.map((reservation) => {
        const {reservation_id,first_name,last_name,mobile_number,reservation_time,people,status} = reservation
        return (
        <tr key={reservation_id}>
            <td className="h-25 px-3">{reservation_id}</td>
            <td className="h-25 px-3">{first_name} {last_name}</td>
            <td className="h-25 px-3">{mobile_number}</td>
            <td className="h-25 px-3">{formatAs12Hr(reservation_time)}</td>
            <td className="h-25 px-3">{people}</td>
            <td className="h-25 px-3" data-reservation-id-status={reservation_id}>{status[0].toUpperCase() + status.slice(1)}</td>
            <td className="h-25 px-3">{status === "booked" ? <a href={`/reservations/${reservation_id}/seat`}><button>Seat</button></a> : null}</td>
        </tr>
    )})

    return (
        <table>
            <thead>
                <tr>
                    <th className="px-3">#</th>
                    <th className="px-3">Name</th>
                    <th className="px-3">Phone</th>
                    <th className="px-3">Time</th>
                    <th className="px-3">People</th>
                    <th className="px-3">Status</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default Reservations