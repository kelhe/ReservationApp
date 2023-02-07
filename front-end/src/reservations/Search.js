import React, { useState } from "react";
import Reservations from "./Reservations";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

function Search({reservationsError,setReservationsError}){
   const [mobile,setMobile] = useState("")
   const [found,setFound] = useState([])
   const [clicked,setClicked] = useState(false)

   const handleChange = ({target}) => {
    setMobile(target.value)
   }

   const handleSubmit = async (event) => {
    const abortController = new AbortController();
    try{
        event.preventDefault();
        const response = await listReservations({mobile_number : mobile},abortController.signal)
        setFound(response)
        setClicked(true)
    } catch (error) {
        setReservationsError(error)
    }
    return () => abortController.abort();
   }

   const searchResult = (clicked) => {
    if(clicked){
        if(found.length){
            return (<Reservations reservations={found}/>)
        } else {
            return <h3>No reservations found</h3>
        }
    } else {
        return null
    }
   } 

  return (
    <div>
      <ErrorAlert error={reservationsError} setReservationsError={setReservationsError}/>
      <form onSubmit={handleSubmit}>
        <div className="row mx-1">
        <label htmlFor="mobile_number" className="d-flex flex-column py-3">
          <h1>Search Reservations:</h1>
          <div className="">
          <input
            className="my-2 mr-2"
            type="text"
            id="mobile_number"
            name="mobile_number"
            pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
            placeholder="Enter a customer's phone number"
            size="28"
            value={mobile}
            onChange={handleChange}
            required
            /> 
            <button type="submit">Find</button>
            </div>
        </label>
        </div>
      </form>
      {searchResult(clicked)}
    </div>
  );
}

export default Search;
