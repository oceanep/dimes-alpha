import {
  Box,
  Flex,
  Button,
  Spacer,
  Image
} from '@chakra-ui/react';
import {
  Link
} from "react-router-dom";

function LandingNav() {

  return (
    <nav>
      <Flex mx={"60px"} my="15px">
        <Box>
          <Image maxW="100px" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/dimes_logo_2.png" alt="Dimes Logo"/>
        </Box>
        <Spacer/>
        <Link to='/signup'>
          <Button colorScheme="teal" size="md" ml="15px">Register</Button>
        </Link>
        <Link to='/login'>
          <Button colorScheme="teal" size="md" ml="15px">Sign In</Button>
        </Link>
      </Flex>
    </nav>
  );
}

export default LandingNav;
