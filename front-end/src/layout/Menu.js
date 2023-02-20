import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={20}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction component={Link} to="/dashboard" label="Dashboard" icon={<DashboardIcon/>} />
          <BottomNavigationAction component={Link} to="/search" label="Search" icon={<SearchIcon />} />
          <BottomNavigationAction component={Link} to="/reservations/new" label="New Reservation" icon={<PersonAddIcon />} />
          <BottomNavigationAction component={Link} to="/tables/new" label="New Table" icon={<AddBoxIcon />} />
        </BottomNavigation>
      </Paper>
    </div>
  )
}

export default Menu;
