import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { CartState } from '../Context';

function SideBar() {

  const { cart, setCart } = CartState();

  const navigate = useNavigate()

  const logoutHandler = () => {
    setCart({})
    navigate('/admin/signin')
  }
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar d-flex justify-content-between' >
          <div>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <div>
            <NavDropdown
              className="px-5"
              title={
                <span style={{ color: 'white' }}>
                  {cart && cart.email ? cart.email : 'Admin'}
                </span>
              }
              id="adminmenu"
            >
              {cart && cart.email ?
                <NavDropdown.Item onClick={logoutHandler}>
                  LogOut
                </NavDropdown.Item>
                :
                <NavDropdown.Item >
                  LogIn
                </NavDropdown.Item>
              }
            </NavDropdown>
          </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
