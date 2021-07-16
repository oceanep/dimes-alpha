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
    Route,
    withRouter,
} from "react-router-dom";

import theme from './styles/theme'

import LandingNav from './components/LandingNav/LandingNav.jsx'
import LandingFooter from './components/LandingFooter/LandingFooter'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/Home/Home'
import Availability from './pages/Availability/Availability'
import UserEventsList from './pages/Events/UserEventsList.jsx'
import Relationships from './pages/Relationships/Relationships.jsx'
import Groups from './pages/Groups/Groups'
import Initiated from './pages/Initiated/Initiated'
import Invited from './pages/Invited/Invited'
import Schedule from './pages/Schedule/Schedule'
import LinkGcal from './pages/LinkGcal/LinkGcal.jsx'
import CalendarTest from './pages/CalendarTest/CalendarTest.jsx'
import PrivacyPage from './pages/Static/PrivacyPage.jsx'
import TermsPage from './pages/Static/TermsPage.jsx'
import './App.scss'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" minW="10vh" >
            <ColorModeSwitcher justifySelf="flex-end" pos="absolute" top="15px" right="0"/>
            <Switch>
              <Route path="/home" component={localStorage.getItem("token") ? Home : LandingPage}></Route>
              <Route path="/calendar" component={localStorage.getItem("token") ? Home : CalendarTest}></Route>
              <Route path="/availability" component={localStorage.getItem("token") ? Availability : LandingPage}></Route>
              <Route path="/relationships" component={localStorage.getItem("token") ? Relationships : LandingPage}></Route>
              <Route path="/groups" component={localStorage.getItem("token") ? Groups : LandingPage}></Route>
              <Route path="/initiated" component={localStorage.getItem("token") ? Initiated : LandingPage}></Route>
              <Route path="/invites" component={localStorage.getItem("token") ? Invited : LandingPage}></Route>
              <Route path="/schedule" component={localStorage.getItem("token") ? Schedule : LandingPage}></Route>
              <Route path="/privacy" component={PrivacyPage}></Route>
              <Route path="/terms" component={TermsPage}></Route>

                <Route exact path="/" component={LandingPage}/>
                <Route path="/login" component={localStorage.getItem("token") ? Home : Login}></Route>
                <Route path="/signup" component={localStorage.getItem("token") ? Home : Signup}></Route>
                <Route path="/:user_id" component={UserEventsList}></Route>

          </Switch>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default withRouter(App);
