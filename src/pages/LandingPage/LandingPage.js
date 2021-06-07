import React, {useState} from 'react';
import {
    useStyleConfig,
    Input,
    Grid,
    GridItem,
    Box,
    Flex,
    Spacer,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    useColorModeValue
} from "@chakra-ui/react"
import {
  MdPermContactCalendar,
  MdImportExport,
  MdPeople,
  MdStarBorder
} from "react-icons/md"

import LandingNav from '../../components/LandingNav/LandingNav.jsx'
import LandingFooter from '../../components/LandingFooter/LandingFooter'

import { Link } from "react-router-dom";
import Card from "../../components/Card/Card.js"
import styles from "./LandingPage.module.scss"

function LandingPage() {

    const bg = useColorModeValue("gray.50","gray.600")
    return (
      <>
      <LandingNav/>
      <Grid minH="100vh" minW="100%" templateRows="1fr 1fr 1fr 0.8fr" className={`${styles.landing} ${styles.test}`} fontSize="14px">

        <GridItem rowStart={1} rowEnd={2} >
          <Flex mx={"auto"} my={"30px"} maxW="1140px" justifyContent="space-around">
            <Box textAlign="left" maxW="40%" mt="2em">
              <Heading mb="30px" size="lg">Relationships should, would, could be easy with Dimes</Heading>
              <Text mb="30px" >Dimes utilises AI cloud technology to create the right place at the right time</Text>
              <Button colorScheme="teal" size="md" mb="15px" >Register Here</Button>
            </Box>
            <Box maxW="50%">
              <Image maxW="100%" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/team.png" />
            </Box>
          </Flex>
        </GridItem>

        <GridItem rowStart={2} rowEnd={3} bg={bg} borderTop="1px" py="70px" borderColor="gray.200">
          <Flex mx={"auto"} maxW="1140px" justifyContent="space-between" >

            <Card maxW="20%">
              <Icon as={MdPermContactCalendar} boxSize="5em"/>
              <Heading mt={6} maxW={60} size="md" textAlign="center" color="gray.700">
                Set up routine schedule
              </Heading>
              <Text mt={6} mb={6} size="xs" color="blackAlpha.500">
                Tuesday evenings no good? Sunday mornings an absolute no-go? Always free on Wednesdays? Set your Routine Schedule.
              </Text>
            </Card>

            <Card maxW="20%">
              <Icon as={MdImportExport} boxSize="5em"/>
              <Heading mt={6} maxW={60} size="md" textAlign="center" color="gray.700">
                Import Existing Commitments
              </Heading>
              <Text mt={6} mb={6} size="xs" color="blackAlpha.500">
                Automatically import any existing commitments you have from your favorite calendar software.
              </Text>
            </Card>

            <Card maxW="20%">
              <Icon as={MdPeople} boxSize="5em"/>
              <Heading mt={6} maxW={60} size="md" textAlign="center" color="gray.700">
                Connect with your Contacts
              </Heading>
              <Text mt={6} mb={6} size="xs" color="blackAlpha.500">
                Share Connect Link to your contacts to connect and get planning.
              </Text>
            </Card>

            <Card maxW="20%">
              <Icon as={MdStarBorder} boxSize="5em"/>
              <Heading mt={6} maxW={60} size="md" textAlign="center" color="gray.700">
                Make a plan
              </Heading>
              <Text mt={6} mb={6} size="xs" color="blackAlpha.500">
                Sit back and let Dimes find the best timing for you and all parties.
              </Text>
            </Card>

          </Flex>
        </GridItem>

        <GridItem rowStart={3} rowEnd={4} borderTop="1px" borderColor="gray.200">
          <Flex mx={"auto"} my={"30px"} maxW="1140px" justifyContent="space-around">
            <Box maxW="50%">
              <Image maxW="100%" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/videocall.png" />
            </Box>
            <Box textAlign="left" maxW="40%" mt="2em">
              <Heading mb="30px" size="lg">Create the perfect timing for your important relationships</Heading>
              <Text mb="30px" >Let Dimes help you look after your important relationships</Text>
            </Box>
          </Flex>
        </GridItem>

        <GridItem rowStart={4} rowEnd={5} bg={bg} borderTop="1px" borderColor="gray.200">
          <Flex mx={"auto"} mt={"30px"} maxW="1140px" justifyContent="space-around">
            <Box textAlign="left" maxW="40%" mt="2em">
              <Text my="30px" >"Assisting people in prioritizing and valuing their meaningful relationships to meet as they wish for their intentions in the right place at the right time."</Text>
              <Heading mb="30px" size="lg">Founder & CEO Eric Wei</Heading>
            </Box>
            <Box maxW="30%">
              <Image maxW="100%" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/eric.png" />
            </Box>
          </Flex>
        </GridItem>

      </Grid>
      <LandingFooter/>
      </>
    )
}

export default LandingPage;
