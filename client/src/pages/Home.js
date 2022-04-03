import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {Button, Carousel, Figure, Form, FormControl, Placeholder} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";

function Home() {
    // #search: navigate to SearchResults page based on names entered in search form
    const [name, setName] = useState("");
    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${name}`, {replace: true});
        setName("");
    };

    return (
        <div>
            <Navigation/>

            <main>
                <section id="search">
                    <Form className="search-area" onSubmit={handleSubmit}>
                        <FormControl className="search-box" aria-label="Type the name of your professor" value={name}
                                     onChange={(e) => setName(e.target.value)}/>
                        <Button variant="outline-dark" type="submit">
                            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
                        </Button>
                    </Form>
                </section>

                <section id="headline">
                    {/*TODO: Map top five professors*/}
                    <Carousel className="headline-img">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="http://hwr.org.uk/wp-content/uploads/2016/11/placeholder-dark-600-400-729dad18518ecd2cd47afb63f9e6eb09.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </section>

                <section id="about">
                    <Figure className="neu-video">
                        <Figure.Image
                            alt="neu video"
                            src="https://www.addictivetips.com/app/uploads/2018/12/YouTube-Screenshot-Button.jpg"
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                        </Figure.Caption>
                    </Figure>
                    <div className="neu-description">
                        <Placeholder xs={6}/>
                        <Placeholder className="w-75"/> <Placeholder style={{width: '25%'}}/>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
}

export default Home;