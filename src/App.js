import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Code,
  Grid,
  Flex,
  Button,
  Spacer
} from '@chakra-ui/react';
import theme from './styles/theme'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import LandingPage from './pages/LandingPage/LandingPage'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" minW="10vh" >
          <nav>
            <Flex mx={"60px"} my="15px">
              <Box bg="blue.500" w="50px"/>
              <Spacer/>
              <Button colorScheme="teal" size="md" ml="15px">Register</Button>
              <Button colorScheme="teal" size="md" ml="15px">Sign In</Button>
            </Flex>
          </nav>
          <ColorModeSwitcher justifySelf="flex-end" pos="absolute" top="0" right="0" mt="15px"/>
            <Router>
              <Route path="/landing">
                <LandingPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </Router>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
