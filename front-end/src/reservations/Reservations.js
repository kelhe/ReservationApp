import React from "react";
import { formatAs12Hr } from "../utils/date-time";
import { updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Reservations({
  reservations,
  setRender,
  render,
  setReservationsError,
  reservationsError,
}) {
  const handleCancellation = async (id) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation?\nThis cannot be undone."
        )
      ) {
        await updateReservationStatus(id, "cancelled", abortController.signal);
        setRender(!render);
      }
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  };

  const rows = reservations.map((reservation) => {
    const {
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
      status,
    } = reservation;
    return (
      <tr key={reservation_id}>
        <td className="h-25 px-3">{reservation_id}</td>
        <td className="h-25 px-3">
          {first_name} {last_name}
        </td>
        <td className="h-25 px-3">{mobile_number}</td>
        <td className="h-25 px-3">{reservation_date}</td>
        <td className="h-25 px-3">{formatAs12Hr(reservation_time)}</td>
        <td className="h-25 px-3">{people}</td>
        <td className="h-25 px-3" data-reservation-id-status={reservation_id}>
          {status[0].toUpperCase() + status.slice(1)}
        </td>
        <td className="h-25 pr-1">
          {status === "booked" ? (
            <a href={`/reservations/${reservation_id}/seat`}>
              <button>Seat</button>
            </a>
          ) : null}
        </td>
        <td className="h-25 pr-1">
          {status === "booked" ? (
            <a href={`/reservations/${reservation_id}/edit`}>
              <button>Edit</button>
            </a>
          ) : null}
        </td>
        <td className="h-25 pr-1">
          {status === "booked" ? (
            <button
              data-reservation-id-cancel={reservation_id}
              onClick={() => handleCancellation(reservation_id)}
            >
              Cancel
            </button>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <table>
        <thead>
          <tr>
            <th className="px-3">#</th>
            <th className="px-3">Name</th>
            <th className="px-3">Phone</th>
            <th className="px-3">Date</th>
            <th className="px-3">Time</th>
            <th className="px-3">People</th>
            <th className="px-3">Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Reservations;
