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

import './withMenu.scss'

const withMenu = Component => {

  const wrappedComponent = ({...props})=> {
    return (
      <Grid minH="100vh" minW="100%" templateColumns="1fr 3fr" templateRows="50px 1fr">
        <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={2} bg='gray.50' border="1px" borderColor="gray.200"></GridItem>
        <GridItem colStart={1} colEnd={2} rowSpan={1} bg='gray.900' border="1px" borderColor="gray.200">
          <SideMenu />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowSpan={1} border="1px" borderColor="gray.200" className="mainComponentContainer">
          <Component {...props} />
        </GridItem>
      </Grid>
    );
  }

  wrappedComponent.displayName = `${Component.displayName}-withMenu`;
  return wrappedComponent;
}

export default withMenu;
