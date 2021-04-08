import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { dataContext } from '../../App';
import './Header.css'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { users } = useContext(dataContext);
    const user = users[0];
    const {  isSignedIn,photoURL} = user;
    return (
        <Navbar color="transparent" light expand="md">
            <NavbarBrand to="/home">NIKE VALLEY</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem className="mx-3 p-2">
                        <Link className="text-dark t_decoration" to="/home">Home</Link>
                    </NavItem>
                    <NavItem className="mx-3 p-2">
                        <Link className="text-dark t_decoration" to="/orders">Orders</Link>
                    </NavItem>
                    <NavItem className="mx-3 p-2">
                        <Link className="text-dark t_decoration" to="/admin">Admin</Link>
                    </NavItem>
                    <NavItem className="mx-3 p-2">
                        <Link className="text-dark t_decoration" to="/deals">Deals</Link>
                    </NavItem>
                    
                        { isSignedIn ?
                        <NavItem className="mx-3 p-2">
                            <img className="user-Image" src={photoURL} alt=""/>
                        </NavItem>
                        :
                        <NavItem className="mx-3 btn-success p-2 border_radius">
                            <Link className="text-white font-weight-bold t_decoration" to="/login">Log In</Link>
                        </NavItem>
                        }
                    
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;