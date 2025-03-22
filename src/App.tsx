import React from "react"
import styled from "styled-components"
import GlobalStyle from "./components/GlobalStyle"
import Header from "./components/header"
import Main from "./components/main"
import Footer from "./components/footer"


const AppEstilos = styled.div`

`



function App() {
  return (
    <>
      <GlobalStyle />
      <AppEstilos/>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
