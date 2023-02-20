import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function DateChange({ date }) {
  const history = useHistory();
  return (
    <ButtonGroup variant="outlined">
      <Button
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        {`<`}
      </Button>
      <Button
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </Button>
      <Button
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        {`>`}
      </Button>
    </ButtonGroup>
  );
}

export default DateChange;
