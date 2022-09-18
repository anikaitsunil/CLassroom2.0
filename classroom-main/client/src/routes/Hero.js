import React from 'react';

const Hero = ({handleLogout}) => {
    return (
        <section>
            <p>Hello World</p>
            <button onClick={handleLogout}>LogOut</button>
        </section>
    );
};

export default Hero;