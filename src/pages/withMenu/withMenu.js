//This is a higher order componennt meant to wrap the menu around
//the rest of the app and manage general overall state of the application
import { useState, useEffect } from "react";
import {
    Center,
    Box,
    Flex,
    Grid,
    VStack
} from "@chakra-ui/react"

import {
  Link
} from "react-router-dom";

const withMenu = Component => {

  const wrappedComponent = ({...props})=> {
    return (
      <Grid minH="100vh" minW="100%" templateColumns="1fr 3fr">
        <Box columnStart={1} columnEnd={2}>
          <Center h="100%">
            <VStack >
              <Link to='/home'>Home</Link>
              <Link to='/availability'>Availability</Link>
              <Link to='/contacts'>Contacts</Link>
              <Link to='/plans'>Plans</Link>
              <Link to='/schedule'>Schedule</Link>
            </VStack>
          </Center>
        </Box>
        <Box columnStart={2} columnEnd={3}>
          <Component {...props} />
        </Box>
      </Grid>
    );
  }

  wrappedComponent.displayName = `${Component.displayName}-withMenu`;
  return wrappedComponent;
}

export default withMenu;
