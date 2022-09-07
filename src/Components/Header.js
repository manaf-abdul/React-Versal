import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { CartState } from '../Context';


const Header = () => {

    const { cart, setCart } = CartState();

    const navigate = useNavigate()

    const logoutHandler = () => {
        setCart({})
        navigate('/admin/signin')
    }

    return (
        <header>
            {/* <Navbar
                variant="dark"
                style={{ backgroundColor: '#001e4f', minHeight: '4rem' }}
                expand="lg"
                collapseOnSelect
                className='p-0'
            >
                <Container>
                    <LinkContainer to="/admin" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.3rem' }}>
                        <Navbar.Brand className='ml-1 brand-text'><span>Di</span>Grow<span>F</span>a</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ml-auto">
                            {cart && cart.token ? (
                                <NavDropdown
                                    className="px-3"
                                    title={
                                        <span style={{ color: 'white' }}>{cart.email}</span>
                                    }
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer style={{ color: 'white' }} to="/admin/signin">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                            <NavDropdown
                                className="px-3"
                                title={
                                    <span style={{ color: 'white' }}>
                                        Admin
                                    </span>
                                }
                                id="adminmenu"
                            >
                                <LinkContainer to="/admin">
                                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/offer">
                                    <NavDropdown.Item>Offers</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/instructor">
                                    <NavDropdown.Item>Course</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/view-blog-posts">
                                    <NavDropdown.Item>Blog</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/enquiry">
                                    <NavDropdown.Item>Enquiry</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/batch">
                                    <NavDropdown.Item>Batch</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
        </header>
    )
};

export default Header;
