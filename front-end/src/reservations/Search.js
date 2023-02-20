import React, { useEffect, useState } from "react";
import Reservations from "./Reservations";
import { listAll, listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

function Search() {
  const [mobile, setMobile] = useState("");
  const [found, setFound] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [searchErrors, setSearchErrors] = useState(null);
  const [autofill, setAutofill] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const mobileNumbers = async () => {
      try {
        const response = await listAll(abortController.signal);
        const numArr = response.map((reservation) => reservation.mobile_number);
        const removeDups = new Set(numArr)
        setAutofill([...removeDups]);
      } catch (error) {}
    };
    mobileNumbers();
    return () => abortController.abort();
  }, []);

  const handleChange = ({ target }) => {
    setMobile(target.value);
  };

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    setSearchErrors(null);
    try {
      event.preventDefault();
      const response = await listReservations(
        { mobile_number: mobile },
        abortController.signal
      );
      setFound(response);
      setClicked(true);
    } catch (error) {
      setSearchErrors(error);
    }
    return () => abortController.abort();
  };

  const searchResult = (clicked) => {
    if (clicked) {
      if (found.length) {
        return <Reservations reservations={found} />;
      } else {
        return <h3>No reservations found</h3>;
      }
    } else {
      return null;
    }
  };

  return (
    <div>
      <ErrorAlert error={searchErrors} />
      <form onSubmit={handleSubmit}>
        <div className="row mx-1">
          <label htmlFor="mobile_number" className="d-flex flex-column py-3">
            <h1>Search Reservations:</h1>
            <div className="d-flex flex-column">
              <Autocomplete
                freeSolo
                value={mobile}
                onChange={(event, newValue) => {
                  setMobile(newValue);
                }}
                disableClearable
                options={autofill.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter a customer's phone number"
                    value={mobile}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
              <Button type="submit" variant="contained">Find</Button>
            </div>
          </label>
        </div>
      </form>
      {searchResult(clicked)}
    </div>
  );
}

export default Search;
