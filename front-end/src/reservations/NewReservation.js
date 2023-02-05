import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function NewReservation({ setCurrentDate, setReservationsError, reservationsError,render,setRender }) {
  let history = useHistory();
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
      const response = await createReservation(formData,abortController.signal
      );
      setFormData(initialForm);
      console.log(response)
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
      <ErrorAlert error={reservationsError} setReservationsError={setReservationsError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name" className="d-flex flex-column py-3">
          First Name
          <input
            className="my-2"
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
        </label>
        <label htmlFor="last_name" className="d-flex flex-column py-3">
          Last Name
          <input
            className="my-2"
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
        </label>
        <label htmlFor="mobile_number" className="d-flex flex-column py-3">
          Mobile Number
          <input
            className="my-2"
            type="text"
            id="mobile_number"
            name="mobile_number"
            placeholder="XXX-XXX-XXXX"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </label>
        <label htmlFor="reservation_date" className="d-flex flex-column py-3">
          Reservation Date
          <input
            className="my-2"
            type="date"
            id="reservation_date"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
            min={today()}
            required
          />
        </label>
        <label htmlFor="reservation_time" className="d-flex flex-column py-3">
          Reservation Time
          <input
            className="my-2"
            type="time"
            id="reservation_time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </label>
        <label htmlFor="people" className="d-flex flex-column py-3">
          # of Guest
          <input
            className="my-2"
            type="number"
            id="people"
            name="people"
            min="1"
            onChange={handleChange}
            value={Number(formData.people)}
            required
          />
        </label>
        <div>
          <button type="button" onClick={() => history.go(-1)}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewReservation;
