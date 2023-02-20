import React from "react";
import { updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";
import ReservationTable from "../reservations/ReservationTable";

function Reservations({ loadDashboard, reservations, date }) {
  const history = useHistory()
  const handleCancellation = async (id) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation?\nThis cannot be undone."
        )
      ) {
        await updateReservationStatus(id, "cancelled", abortController.signal);
        if(!loadDashboard){
          history.go(0);
        } else {
          await loadDashboard()
        }
      }
    } catch (error) {
      console.error(error)
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <ReservationTable reservations={reservations} handleCancellation={handleCancellation} date={date}/>
    </div>
  );
}

export default Reservations;
