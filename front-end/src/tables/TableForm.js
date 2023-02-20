import React from "react";
import { Paper, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function TableForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();
  return (
    <Paper sx={{maxWidth : 800}}>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around">
        <label htmlFor="table_name" className="d-flex flex-column p-3">
          Table Name
          <input
            className="my-2 border border-dark" 
            type="text"
            id="table_name"
            name="table_name"
            placeholder="Table Name"
            onChange={handleChange}
            value={formData.table_name}
            required
            />
        </label>
        <label htmlFor="capacity" className="d-flex flex-column p-3">
          Capacity
          <input
            className="my-2 border border-dark"
            type="number"
            id="capacity"
            name="capacity"
            min="1"
            onChange={handleChange}
            value={formData.capacity}
            required
            />
        </label>
        </div>
        <div className="d-flex justify-content-end p-3">
          <Button variant="outlined" type="button" onClick={() => history.go(-1)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">Submit</Button>
        </div>
      </form>
    </Paper>
  );
}

export default TableForm;
