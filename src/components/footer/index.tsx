import React from "react";
import styled from "styled-components";

const FooterEstilos = styled.footer`
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
`


const Footer = () =>{
    return(
        <FooterEstilos>
            <p>© 2021 - Todos los derechos reservados</p>
        </FooterEstilos>
    )
}

export default Footer;