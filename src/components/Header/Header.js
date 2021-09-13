import React, { Component } from "react";
import {Redirect, useHistory} from "react-router-dom";
import {
	UncontrolledCollapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	NavLink,
	NavItem,
	Nav,
	Container,
	Row,
	Col,
	NavDropdown,Button
} from 'react-bootstrap'



export default function Header(props) {
		const history = useHistory();
	 /*const handleLogout = (e) => {
        e.preventDefault();
         localStorage.removeItem('token');
		 sessionStorage.removeItem('isLoggedIn');
		 return <Redirect to="/todo" />;
		  onClick={handleLogout}
    }	*/
	function logout(){
		localStorage.clear()
		history.push('/login')
	}
	return (
		<>
		<div>
		<div className="row">
		<div className="col-md-12">
		<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
		<Navbar.Brand href="#home" className=" ml-50">TODO APP</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto nav_bar_wrapper">
			{
				localStorage.getItem('isLoggedIn')?
				<>
					<Nav.Link href="/todo">Todo</Nav.Link>
					<Nav.Link onClick={logout}>Logout</Nav.Link>
				</>
				:
				<>
					<Nav.Link href="/login">Login</Nav.Link>
					<Nav.Link href="/register">Register</Nav.Link>
				</>
			}
			</Nav>
			
		</Navbar.Collapse>
		
		
		</Navbar>
		</div></div></div>
		</>
	)
}