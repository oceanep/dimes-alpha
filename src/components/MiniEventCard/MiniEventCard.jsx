import {
  useStyleConfig,
  Box,
  Flex,
  Spacer,
  Checkbox,
  Button,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react"

import QRCode from "react-qr-code";

const MiniEventCard = ({event}) => {
  const { type, title, desc, duration, variant, value, timeRange, date, active, id, url } = event

  const formatedDate = date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : null

  const c_styles = useStyleConfig("MiniEventCard", { variant })

  return (
    <Box __css={c_styles.container}>
      <Box __css={c_styles.topbar}></Box>
      <Flex minW='40%' maxW='60%' justifyContent='center' alignItems="center" display="inline-flex">
      <Box __css={c_styles.body}>
          <button className={c_styles.cardBody}>
            <Text fontSize="md">{title}</Text>
            <Text fontSize="sm" color="gray.400">{desc}</Text>
            <Text fontSize="sm" color="gray.400">{`${formatedDate} ${timeRange}`}</Text>
          </button>
      </Box>
      <Box><QRCode size={50} value={value} /></Box>
      </Flex>
      <Box __css={c_styles.foot}/>
    </Box>
  )
}

export default MiniEventCard
