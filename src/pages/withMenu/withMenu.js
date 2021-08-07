//This is a higher order componennt meant to wrap the menu around
//the rest of the app and manage general overall state of the application
import { useState, useEffect } from "react";
import {
    Center,
    Box,
    Flex,
    Grid,
    VStack,
    GridItem
} from "@chakra-ui/react"

import {
  Link
} from "react-router-dom";

import SideMenu from '../../components/SideMenu/SideMenu'
import LandingNav from '../../components/LandingNav/LandingNav.jsx'

import UseContactsProvider from '../../hooks/useContacts'
import UseGroupsProvider from '../../hooks/useGroups'
import UseEventsProvider from '../../hooks/useEvents'
import UseTemplatesProvider from '../../hooks/useTemplates'

import './withMenu.scss'

const withMenu = Component => {

  const wrappedComponent = ({...props})=> {
    return (
      <Grid minH="100vh" minW="100%" templateColumns="240px 3fr" templateRows="70px 1fr"  background="gray.50">
        <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={2}>
          <Box h="100%" bg='white' borderBottom="1px solid" borderColor="gray.200" boxShadow="md">
            <LandingNav/>
          </Box>
        </GridItem>
        <GridItem colStart={1} colEnd={2} rowSpan={1}>
          <Box h="100%" bg='white'  borderRight="1px" borderColor="gray.200" boxShadow="md">
            <SideMenu />
          </Box>

        </GridItem>
        <GridItem colStart={2} colEnd={3} rowSpan={1} className="mainComponentContainer">
          <UseContactsProvider>
          <UseGroupsProvider>
          <UseEventsProvider>
          <UseTemplatesProvider>
            <Component {...props} />
          </UseTemplatesProvider>
          </UseEventsProvider>
          </UseGroupsProvider>
          </UseContactsProvider>
        </GridItem>
      </Grid>
    );
  }

  wrappedComponent.displayName = `${Component.displayName}-withMenu`;
  return wrappedComponent;
}

export default withMenu;
