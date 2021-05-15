import {useState} from 'react';
import {
    Center,
    Box,
    Flex
} from "@chakra-ui/react"
import withMenu from '../withMenu/withMenu'

import styles from './Plans.module.scss'

function Plans() {

  return (
    <Center h="100%">Plans</Center>
  );
}

Plans.displayName = "Plans"
export default withMenu(Plans);
