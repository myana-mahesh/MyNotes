import React, { useState } from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

export default function NavBar(props) { 
    const [search, setSearch] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        props.passSearchText(search);
    }
    return(
            <Navbar variant="dark" expand="lg">
            <Navbar.Brand href="/" style={{ color: '#39ae3fde' }}>
                <img
                alt=""
                src="./assets/images/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                MyNotes
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Form inline style={{marginLeft:'auto'}} onSubmit={handleSubmit}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 mt-1" value={search} onChange={(event) => {
                        setSearch(event.target.value);
                        if (event.target.value === '') {
                                props.passSearchText("");
                            }}}/>
                    <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
    );
    }