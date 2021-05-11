import React, {useState} from 'react';
import {
    Input,
    VStack
} from "@chakra-ui/react"
import {
    Link
  } from "react-router-dom";

function LandingPage() {

    return (
      <div className="Landing">
          This is the landing page!
          <br></br>
          You can either <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>!
      </div>
    )
}

export default LandingPage;