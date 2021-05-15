import {
  Box,
  Flex,
  Button,
  Spacer,
  Text,
  Image
} from '@chakra-ui/react';
import {
  Link
} from "react-router-dom";

function LandingFooter() {

  return (
    <footer>
      <Flex mx={"60px"} py="4em" alignItems="center">
        <Box>
          <Image maxW="100px" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/dimes_logo_2.png" alt="Dimes Logo"/>
        </Box>
        <Text ml="15px" fontSize="xs"><a href="" target="_blank">Privacy Notice</a> | <a href="" target="_blank">Terms of Use</a></Text>
        <Spacer/>
        <Text fontSize="xs">&#169;2021 Dimes Inc.</Text>
      </Flex>
    </footer>
  );
}

export default LandingFooter;
