import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

function NewTable({setRender,render,setReservationsError, reservationsError}) {
  const history = useHistory();
  const initialForm = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState(initialForm);
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
      const response = await createTable(formData,abortController.signal);
      setFormData(initialForm);
      if(response){
        setRender(!render);
        history.push("/dashboard");
      }
    } catch (error) {
      setReservationsError(error)
    }
  };

  return (
    <div>
      <h1>New Table</h1>
      <ErrorAlert error={reservationsError} setReservationsError={setReservationsError}/>
      <TableForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}

export default NewTable;
