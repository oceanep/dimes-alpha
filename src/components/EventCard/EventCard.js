import { Fragment } from 'react'
import {
  useStyleConfig,
    Box,
    Flex,
    Spacer,
  Checkbox,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react"
import { MdSettings, MdContentCopy, MdModeEdit, MdDelete, MdExpandMore, MdExpandLess } from 'react-icons/md'

import styles from './EventCard.module.scss'
import QRCode from "react-qr-code";

import { UseEventsDispatch } from '../../hooks/useEvents'

function EventCard(props) {

  const { title, desc, variant, value, time, day, id } = props
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  // const subtitle = `${ variant == "fifteen" ? '15 mins,' : ''}${ variant == "thirty" ? '30 mins,' : ''}${ variant == "sixty" ? '60 mins,' : ''} ${type}`
  const c_styles = useStyleConfig("EventCard", { variant })

  const { deleteEvent } = UseEventsDispatch()

  const deleteE = () => {
    deleteEvent(id)
  }

  return (
    <Box __css={c_styles.container}>
      <Box __css={c_styles.topbar}></Box>
      <Box __css={c_styles.checkbox}>
        <Checkbox size="md"/>
      </Box>
      <Box __css={c_styles.settings}>
        <Menu>
          {({ isOpen }) => (
            <Fragment>
              <MenuButton isActive={isOpen} as={Button} rightIcon={ isOpen ? <MdExpandLess /> : <MdExpandMore />} background="none" _hover={{ background: "none" }} _active={{ background: "none" }} _focus={{ border: "none" }}>
                <MdSettings />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<MdModeEdit/>} >Edit</MenuItem>
                <MenuItem icon={<MdDelete/>} onClick={ deleteE } >Delete</MenuItem>
              </MenuList>
            </Fragment>
          ) }
        </Menu>
      </Box>
      <Flex minW='40%' maxW='60%' justifyContent='center' alignItems="center" display="inline-flex">
      <Box __css={c_styles.body}>
        <button className={styles.cardBody}>
          <Text fontSize="md">{title}</Text>        
          <Text fontSize="sm" color="gray.400">{desc}</Text>
          {
            day && time ?
              <Text fontSize="sm" color="gray.400">{`${days[day] ? days[day] : day} ${time}`}</Text>
            :
            ''
          }
          <Link fontSize="md" color="teal.500" href="#">View Booking Page</Link>
        </button>
      </Box>
        <Box><QRCode size={50} value={value} /></Box>
      </Flex>
      <Box __css={c_styles.foot}>
        <Box __css={c_styles.footCol1}>
          <Button leftIcon={<MdContentCopy/>} float="left" pl="0px" background="none" _hover={{ background: "none" }} _active={{ background: "none" }} _focus={{ border: "none" }}>
            <Text fontSize="sm">Copy Link</Text>
          </Button>
        </Box>
        <Box __css={c_styles.footCol2}>
          <Button variant="outline">
            <Text fontSize="sm">Share</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  )

}

export default EventCard;
