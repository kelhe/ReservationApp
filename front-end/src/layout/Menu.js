import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  // return (
  //   <nav className="navbar navbar-dark align-items-start p-0">
  //     <div className="container-fluid d-flex flex-column p-0">
  //       <Link
  //         className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
  //         to="/"
  //       >
  //         <div className="sidebar-brand-text mx-3">
  //           <span>Periodic Tables</span>
  //         </div>
  //       </Link>
  //       <hr className="sidebar-divider my-0" />
  //       <ul className="nav navbar-nav text-light" id="accordionSidebar">
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/dashboard">
  //             <span className="oi oi-dashboard" />
  //             &nbsp;Dashboard
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/search">
  //             <span className="oi oi-magnifying-glass" />
  //             &nbsp;Search
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/reservations/new">
  //             <span className="oi oi-plus" />
  //             &nbsp;New Reservation
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/tables/new">
  //             <span className="oi oi-layers" />
  //             &nbsp;New Table
  //           </Link>
  //         </li>
  //       </ul>
  //       <div className="text-center d-none d-md-inline">
  //         <button
  //           className="btn rounded-circle border-0"
  //           id="sidebarToggle"
  //           type="button"
  //         />
  //       </div>
  //     </div>
  //   </nav>
  // );


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
