import React, {useState}from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

function NewReservation({setCurrentDate}){
let history = useHistory()
const initialForm = {
    "first_name" : "",
    "last_name" : "",
    "mobile_number" : "",
    "reservation_date" : "",
    "reservation_time" : "",
    "people" : 1
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
    event.preventDefault();
    const response = await createReservation(formData);
    setFormData(initialForm);
    if(response){
        const newDate = formatAsDate(response.data.reservation_date)
        setCurrentDate(newDate)
        history.push(`/dashboard?date=${newDate}`);
    }
  };

return (
<div>
   <h1>New Reservation</h1>
   <form onSubmit={handleSubmit}>
        <label htmlFor="first_name" className="d-flex flex-column py-3">First Name
                <input
                className="my-2"
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                onChange= {handleChange}
                value={formData.first_name}
                required
                />
        </label>
        <label htmlFor="last_name" className="d-flex flex-column py-3">Last Name
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
        <label htmlFor="mobile_number" className="d-flex flex-column py-3">Mobile Number
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
        <label htmlFor="reservation_date" className="d-flex flex-column py-3">Reservation Date
                <input
                className="my-2"
                type="date"
                id="reservation_date"
                name="reservation_date"
                onChange={handleChange}
                value={formData.reservation_date}
                required
                />
        </label>
        <label htmlFor="reservation_time" className="d-flex flex-column py-3">Reservation Time
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
        <label htmlFor="people" className="d-flex flex-column py-3"># of Guest
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
    <button type="button" onClick={()=>history.go(-1)}>Cancel</button>
    <button type="submit">Submit</button>
   </div>
   </form>
</div>
)
}

export default NewReservation