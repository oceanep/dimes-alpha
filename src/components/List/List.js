import {useState} from 'react';
import {
  useStyleConfig,
  Center,
  Box,
  Flex,
  Heading
} from "@chakra-ui/react"

import styles from './List.module.scss'

function List(props) {
  const { variant, children, title,  ...rest } = props
  const c_styles = useStyleConfig("List", { variant })

  return (
    <Box __css={c_styles.container} {...rest} w="100%" h="100%">
      <Box __css={c_styles.topBar} {...rest} h="2em">
        {
          title ? <Heading size="md">{title}</Heading> : ''
        }
      </Box>
      <Flex flexDirection='column' className={styles.listFlex}>{children}</Flex>
      <Box __css={c_styles.bottomBar} {...rest} h="2em" />
    </Box>
  )
}

List.displayName = "List"
export default List;
