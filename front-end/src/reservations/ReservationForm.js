import React from "react";
import { Paper, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleSubmit, handleChange, formData }) {
  const history = useHistory();
  return (
    <Paper sx={{maxWidth : 900}}>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around">
          <label htmlFor="first_name" className="d-flex flex-column p-3">
            First Name
            <input
              className="my-2 border border-dark"
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
          </label>
          <label htmlFor="last_name" className="d-flex flex-column p-3 mr-2">
            Last Name
            <input
              className="my-2 border border-dark"
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
          </label>
          <label htmlFor="mobile_number" className="d-flex flex-column p-3">
            Mobile Number
            <input
              className="my-2 border border-dark"
              type="text"
              id="mobile_number"
              name="mobile_number"
              pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
              placeholder="XXX XXX XXXX"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            />
          </label>
        </div>
        <div className="d-flex justify-content-around">
          <label htmlFor="reservation_date" className="d-flex flex-column mr-5">
            Reservation Date
            <input
              className="my-2 border border-dark"
              type="date"
              id="reservation_date"
              name="reservation_date"
              onChange={handleChange}
              value={formData.reservation_date}
              required
            />
          </label>
          <label htmlFor="reservation_time" className="d-flex flex-column mr-4">
            Reservation Time
            <input
              className="my-2 border border-dark"
              type="time"
              id="reservation_time"
              name="reservation_time"
              onChange={handleChange}
              value={formData.reservation_time}
              required
            />
          </label>
          <label htmlFor="people" className="d-flex flex-column ml-5">
            # of Guest
            <input
              className="my-2 border border-dark"
              type="number"
              id="people"
              name="people"
              min="1"
              onChange={handleChange}
              value={Number(formData.people)}
              required
            />
          </label>
        </div>
        <div className="d-flex justify-content-end p-3">
          <Button variant="outlined" type="Button" onClick={() => history.go(-1)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">Submit</Button>
        </div>
      </form>
    </Paper>
  );
}

export default ReservationForm;
