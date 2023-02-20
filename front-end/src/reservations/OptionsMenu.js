import React, {useState} from "react";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function OptionsMenu({handleCancellation, reservation_id}){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
         {<MoreHorizIcon/>}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem component={Link} to={`/reservations/${reservation_id}/seat`}>Seat</MenuItem>
          <MenuItem component={Link} to={`/reservations/${reservation_id}/edit`}>Edit</MenuItem>
          <MenuItem data-reservation-id-cancel={reservation_id} onClick={()=>handleCancellation(reservation_id)}>Cancel</MenuItem>
        </Menu>
      </div>
    );
}

export default OptionsMenu