import React from "react"

function Reservations({reservations}){
    const rows = reservations.map((reservation,idx) => (
        <tr key={idx}>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.first_name} {reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_time}</td>
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