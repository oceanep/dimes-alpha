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
import theme from './styles/theme'
import LandingNav from './components/LandingNav/LandingNav'
import LandingFooter from './components/LandingFooter/LandingFooter'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import LandingPage from './pages/LandingPage/LandingPage'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" minW="10vh" >
          <Router>
            <LandingNav/>
            <ColorModeSwitcher justifySelf="flex-end" pos="absolute" top="0" right="0" mt="15px"/>
            <Route path="/landing">
              <LandingPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <LandingFooter/>
          </Router>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
