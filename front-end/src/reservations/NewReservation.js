import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation({setCurrentDate,setReservationsError,reservationsError,render,setRender}) {
  const history = useHistory();
  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState(initialForm);
  //handler form changes for the create form
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  
  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    try {
      event.preventDefault();
      const response = await createReservation(
        formData,
        abortController.signal
      );
      setFormData(initialForm);
      const newDate = formatAsDate(response.reservation_date);
      setCurrentDate(newDate);
      setRender(!render);
      history.push(`/dashboard?date=${newDate}`);
    } catch (error) {
      setReservationsError(error);
    }
  };

  return (
    <div>
      <h1>New Reservation</h1>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <ReservationForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />
    </div>
  );
}

export default NewReservation;
