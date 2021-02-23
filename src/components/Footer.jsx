import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Logo from "components/_ui/Logo"

const FooterContainer = styled("div")`
  padding-top: 3.75em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    max-width: 50px;
  }

  #copyright {
    font-size: 0.75em;
    color: ${colors.grey700};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin-top: 1.5em;
  }
`

const Footer = () => (
  <FooterContainer>
    <Link to="/">
      <Logo />
    </Link>
    <div id="copyright">© 2021 — Copyright Jonathan C. Nesci</div>
  </FooterContainer>
)

export default Footer
