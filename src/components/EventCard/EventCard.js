import { Fragment, useState, useEffect } from 'react'
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
  InputGroup,
  Input,
  Textarea,
  Select,
  InputLeftAddon,
  Stack,
  Switch,
  AvatarGroup,
  Avatar
} from "@chakra-ui/react"
import { MdSettings, MdPerson, MdContentCopy, MdModeEdit, MdDelete, MdExpandMore, MdExpandLess } from 'react-icons/md'

import styles from './EventCard.module.scss'
import QRCode from "react-qr-code";

import DatePicker from 'react-date-picker';
import useToggle from '../../hooks/useToggle'
import { useContactsState } from '../../hooks/useContacts'
import { useGroupsState } from '../../hooks/useGroups'

import EditInviteesModal from '../EditInviteesModal/EditInviteesModal'

//remove after implementing availability context
import timeUtils from '../../utils/time_utils.js'

function EventCard({ type, title, desc, duration, variant, value, time, day, active, invitees, id, url, onDelete, onEditSave }) {

  //set up initial placeholders for inputs, mostly aesthetic
  let initialTime = null
  let intialTimePlaceholder = null
  let initDurPh = null

  if (type === "Event" && time) {
    initialTime = [timeUtils.convertFromTime(time).beginCodec, timeUtils.convertFromTime(time).endCodec]
    intialTimePlaceholder = `${time[0]} - ${time[1]}`
    initDurPh = `${duration * 15} Minutes`
    duration = duration * 15
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  // const subtitle = `${ variant == "fifteen" ? '15 mins,' : ''}${ variant == "thirty" ? '30 mins,' : ''}${ variant == "sixty" ? '60 mins,' : ''} ${type}`
  const c_styles = useStyleConfig("EventCard", { variant })

  const username = localStorage.username
  const [editable: state, toggleEdit: toggle ] = useToggle()
  const { contacts } = useContactsState()
  const { groups } = useGroupsState()

  const [newDuration, setDuration] = useState(duration)
  const [newTime, setTime] = useState(initialTime)
  const [newDesc, setDesc] = useState(desc)
  const [newTitle, setTitle] = useState(title)
  const [newUrl, setUrl] = useState(url)
  const [newDate, setDate] = useState(day)
  const [newActive, setActive] = useState(active)
  const [newInvitees, setNewInvitees] = useState([])
  const [deleteInvitees, setDeleteInvitees] = useState([])

  //delete after implementing availability context
  const [matches, setMatches] = useState([])

  let formatedDate = type === "Event" && newDate ? `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}` : null

  useEffect(() => {
    formatedDate = type === "Event" ? `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}` : null
  }, [newDate])

  useEffect(() => {
    if (type === "Event") calculateTimes()
  }, [newDuration])

  const deleteE = () => {
    onDelete(id)
  }

  const editE = () => {

    toggleEdit()
    // onEdit(id, )
  }

  const saveE = async () => {
    let res = {};
    if (type === "Template") {
      res = await onEditSave(
        id,
        newTitle,
        parseInt(newDuration),
        newDesc,
        newActive,
        newUrl
      )
      toggleEdit()
    }
    if (type === "Event") {
      res = await onEditSave(
        id,
        newTitle,
        newDesc,
        1,
        newTime[0],
        newTime[1],
        newDate.toISOString(),
        newInvitees,
        deleteInvitees
      )
      toggleEdit()
    }
  }

  //delete after implementing availability context
  const calculateTimes = ()=> {
    const tFactor = newDuration/15
    // console.log('duration and tfactor: ', duration, tFactor)

    const t1a = Math.floor(Math.random() * 97)
    const t2a = Math.floor(Math.random() * 97)
    const t3a = Math.floor(Math.random() * 97)

    const t1b = t1a + tFactor
    const t2b = t2a + tFactor
    const t3b = t3a + tFactor

    // console.log("calculateTimes: ", t1a, t1b)
    setMatches([
      [t1a, t1b],
      [t2a, t2b],
      [t3a, t3b]
    ])

  }

  const displayInvitee = (invitee) => {
    let item = {
      name: null,
      photo: null,
      email: null
    }
    let isGroup = false
    if (invitee.groupInviteeId) {
      const group = groups.find( group => group.id === invitee.groupInviteeId )
      item.name = group.name
      item.photo = group.photo ? group.photo : ''
      isGroup = true
    }
    if (invitee.userInviteeId) {
      //add check below for if find in contacts fails
      //on fail, query users for user info
      const contact = contacts.find( contact => contact.contactId === invitee.userInviteeId)
      const name = `${contact?.firstName || ''} ${contact?.lastName || ''}`
      item.name = name
      item.photo = contact?.photo || ''
      item.email = contact?.email || ''
    }
    if (!invitee.groupInviteeId && !invitee.userInviteeId) item.email = invitee.inviteeEmail

    return (
      isGroup ? <Avatar key={invitee.id} name={item.name || item.email} border='3px solid #81e6d9' src={item.photo} icon={<MdPerson/>} /> : <Avatar key={invitee.id} name={item.name || item.email} src={item.photo} icon={<MdPerson/>} />
    )
  }

  const setInviteeTypes = (newI, deleteI) => {
    setNewInvitees(newI)
    setDeleteInvitees(deleteI)
  }

  return (
    <Box __css={c_styles.container}>
      <Box __css={c_styles.topbar}></Box>
      <Box __css={c_styles.checkbox}>
        {
          !editable ?
            <Checkbox size="md"/>
          :
            <Switch size="sm" defaultIsChecked={active} value={active} onChange={ e => setActive(e.target.checked)}/>
        }
      </Box>
      <Box __css={c_styles.settings}>
        <Menu>
          {({ isOpen }) => (
            <Fragment>
              <MenuButton isActive={isOpen} as={Button} rightIcon={ isOpen ? <MdExpandLess /> : <MdExpandMore />} background="none" _hover={{ background: "none" }} _active={{ background: "none" }} _focus={{ border: "none" }}>
                <MdSettings />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<MdModeEdit/>} onClick={ editE } >{!editable ? "Edit" : "Cancel"}</MenuItem>
                <MenuItem icon={<MdDelete/>} onClick={ deleteE } >Delete</MenuItem>
              </MenuList>
            </Fragment>
          ) }
        </Menu>
      </Box>
      <Flex minW='40%' maxW='60%' justifyContent='center' alignItems="center" display="inline-flex">
      <Box __css={c_styles.body}>
        {
          !editable ?
            <button className={styles.cardBody}>
              <Text fontSize="md">{title}</Text>
              <Text fontSize="sm" color="gray.400">{desc}</Text>
              {
                type === "Event" ?
                  <Text fontSize="sm" color="gray.400">{`${days[formatedDate] ? days[formatedDate] : formatedDate} ${time}`}</Text>
                : type === "Template" ?
                  <Link fontSize="md" color="teal.500" href={`dimes-app.com/${username}/${url}`}>View Booking Page</Link>
                :
                null
              }
            </button>
          :
            <Box className={styles.cardBody}>
              <Stack spacing={1}>
                <InputGroup size='sm'>
                  <InputLeftAddon children="Title" maxW="54px"/>
                  <Input
                      placeholder={`${type} Name`}
                      onChange={e => setTitle(e.target.value)}
                      value={newTitle}
                      isRequired
                  />
                </InputGroup>
                <InputGroup size='sm'>
                  <InputLeftAddon children="Dur." maxW="54px"/>
                  <Select
                      placeholder={type === "Event" ? initDurPh : newDuration}
                      size='sm'
                      onChange={e => setDuration(e.target.value)}
                      value={newDuration}
                      isRequired
                  >
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="60">60 Minutes</option>
                  </Select>
                </InputGroup>
                <InputGroup size='sm'>
                  <InputLeftAddon children="Desc" maxW="54px"/>
                  <Input
                      size="sm"
                      placeholder={`${type} Description`}
                      onChange={e => setDesc(e.target.value)}
                      value={newDesc}
                      isRequired
                  />
                </InputGroup>
                {
                  type === "Event" ?
                    <InputGroup size='sm'>
                      <InputLeftAddon children="Date" maxW="54px"/>
                      <DatePicker
                        onChange={setDate}
                        value={newDate}
                        className={styles.datePicker}
                      />
                    </InputGroup>
                  : type === "Template" ?
                    <InputGroup size='sm'>
                      <InputLeftAddon children="URL/" maxW="54px"/>
                      <Input
                        size="sm"
                        placeholder={`dimes-app.com/${username}/`}
                        onChange={e => setUrl(e.target.value)}
                        value={newUrl}
                        isRequired
                      />
                    </InputGroup>
                  :
                  null
                }
                {
                  type === "Event" ?
                    <>
                      <InputGroup size='sm'>
                        <InputLeftAddon children="Time" maxW="54px"/>
                        <Select
                            placeholder={intialTimePlaceholder}
                            size='sm'
                            onChange={e => setTime([parseInt(e.target.value.split(",")[0]), parseInt(e.target.value.split(",")[1])])}
                            value={newTime}
                            isRequired
                        >
                            {
                              matches.map((match, index) => {
                                let cTime = timeUtils.convertToTime(match[0], match[1])
                                return (
                                  <option key={index} value={match}>{`${cTime[0]} - ${cTime[1]}`}</option>
                                )
                              })
                            }
                        </Select>
                      </InputGroup>
                      <EditInviteesModal
                        invitees={invitees}
                        onFinish={setInviteeTypes}
                      />
                    </>
                  :
                    null
                }
              </Stack>
            </Box>
        }
        {
          !editable && type === 'Event' && invitees.length > 0 ?
            <Box mb="-60px" pt="10px">
              <AvatarGroup max={6}>
                {
                  invitees.map( invitee => displayInvitee(invitee))
                }
              </AvatarGroup>
            </Box>
          :
            null
        }
      </Box>
        { !editable ? <Box><QRCode size={50} value={value} /></Box> : null }
      </Flex>
      <Box __css={c_styles.foot}>
        <Box __css={c_styles.footCol1}>
          <Button leftIcon={<MdContentCopy/>} float="left" pl="0px" background="none" _hover={{ background: "none" }} _active={{ background: "none" }} _focus={{ border: "none" }}>
            <Text fontSize="sm">Copy Link</Text>
          </Button>
        </Box>
        <Box __css={c_styles.footCol2}>
          { !editable ? <Button variant="outline" fontSize="sm">Share</Button>
            :
              <>
                <Button variant="outline" fontSize="sm" onClick={toggleEdit}>Cancel</Button>
                <Button fontSize="sm" ml="10px" onClick={ saveE }>Save</Button>
              </>
          }
        </Box>
      </Box>
    </Box>
  )

}

export default EventCard;
