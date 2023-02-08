import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { getReservationWithId, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate, formatAsTime } from "../utils/date-time";

function EditReservation({ reservationsError, setReservationsError, render,setRender,setCurrentDate }) {
  const history = useHistory() 
  const { reservation_id } = useParams();
  const initialEditForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [editForm, setEditForm] = useState(initialEditForm);

  useEffect(() => {
    const abortController = new AbortController();
    async function getEditData() {
      setReservationsError(null);
      try {
        const response = await getReservationWithId(
          reservation_id,
          abortController.signal
        );
        const {
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time,
          people,
          status
        } = response;
        const currentData = {
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time : formatAsTime(reservation_time),
          people,
          status
        };
        setEditForm(currentData)
      } catch (error) {
        setReservationsError(error);
      }
    }
    getEditData();
    return () => abortController.abort();
  }, [reservation_id,setReservationsError]);

  const handleEditChange = ({ target }) => {
    setEditForm({
      ...editForm,
      [target.name]: target.value,
    });
  };
  
  const handleEditSubmit = async (event) => {
    const abortController = new AbortController();
    try {
      event.preventDefault();
      const response = await updateReservation(reservation_id,editForm,abortController.signal);
      setEditForm(initialEditForm);
      const date = formatAsDate(response.reservation_date)
      setCurrentDate(date)
      setRender(!render)
      history.push(`/dashboard?date=${date}`)
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <ReservationForm
        handleSubmit={handleEditSubmit}
        handleChange={handleEditChange}
        formData={editForm}
      />
    </div>
  );
}

export default EditReservation;
