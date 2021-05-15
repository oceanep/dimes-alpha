import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Code,
  Grid,
  Flex,
  Button,
  Spacer,
  HStack,
  Image
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import theme from './styles/theme'

import LandingNav from './components/LandingNav/LandingNav'
import LandingFooter from './components/LandingFooter/LandingFooter'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/Home/Home'
import Availability from './pages/Availability/Availability'
import Contacts from './pages/Contacts/Contacts'
import Plans from './pages/Plans/Plans'
import Schedule from './pages/Schedule/Schedule'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" minW="10vh" >
          <Router>

            <ColorModeSwitcher justifySelf="flex-end" pos="absolute" top="0" right="0" mt="15px"/>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/availability" component={Availability}></Route>
              <Route path="/contacts" component={Contacts}></Route>
              <Route path="/plans" component={Plans}></Route>
              <Route path="/schedule" component={Schedule}></Route>
              <div>
                <LandingNav/>
                <Route path="/landing" component={LandingPage}/>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={Signup}></Route>
                <LandingFooter/>
              </div>
            </Switch>

          </Router>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
