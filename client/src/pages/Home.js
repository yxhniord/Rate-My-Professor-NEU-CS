import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function Home(props) {
    return (
        <div>
            <Navigation/>
            <section id="search">
                Search
            </section>
            <section id="headline">
                Headline
            </section>
            <section id="about">
                About
            </section>
            <Footer/>
        </div>
    );
}

export default Home;