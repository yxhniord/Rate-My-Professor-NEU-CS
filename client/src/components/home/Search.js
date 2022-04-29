import React from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Home.css";

function Search({name, setName, handleSubmit}) {
    return (
        <section id="search">
            <Form className="search-area" onSubmit={handleSubmit}>
                <FormControl className="search-box" placeholder="Type professor's name" size="lg" value={name}
                             onChange={(e) => setName(e.target.value)}/>
                <Button variant="dark" type="submit" size="lg" aria-label="search">
                    <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
                </Button>
            </Form>
        </section>
    );
}

export default Search;