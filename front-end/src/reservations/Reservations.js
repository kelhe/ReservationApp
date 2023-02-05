import React from "react"
import { formatAs12Hr } from "../utils/date-time"

function Reservations({reservations}){
    const rows = reservations.map((reservation) => (
        <tr key={reservation.reservation_id}>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.first_name} {reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{formatAs12Hr(reservation.reservation_time)}</td>
            <td>{reservation.people}</td>
        </tr>
    ))

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Time</th>
                    <th>People</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default Reservations