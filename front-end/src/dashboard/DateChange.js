import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function DateChange({ date }) {
  const history = useHistory();
  return (
    <div class="btn-group d-flex" role="group">
      <button
        className="btn btn-secondary mx-1"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        className="btn btn-secondary mx-1"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        className="btn btn-secondary mx-1"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        Next
      </button>
    </div>
  );
}

export default DateChange;
