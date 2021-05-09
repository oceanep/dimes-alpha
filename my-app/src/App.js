import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Router, Link } from "@reach/router"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" minW="10vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Router>
              <Login path="/login" />
              <Signup path="/signup" />
            </Router>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
