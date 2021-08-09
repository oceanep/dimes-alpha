import { useState, useCallback, useEffect } from 'react';
import {
    Flex,
    Box,
    Circle,
    Heading,
    Text,
    Button,
    Icon,
    InputGroup,
    Input,
    InputRightAddon,
    Textarea,
    Avatar,
    Spinner
} from "@chakra-ui/react"

import {
    withRouter,
    Link
} from "react-router-dom";

import { MdNavigateNext, MdArrowBack, MdAccessTime, MdDateRange } from 'react-icons/md'

import usePages from '../../hooks/usePages'
import useUsers from '../../hooks/useUsers'
import useAvailability from '../../hooks/useAvailability'
import eventTemplates from '../../utils/event_templates'
import userEvents from '../../utils/user_events'
import eventInvites from '../../utils/event_invites'
import timeUtils from '../../utils/time_utils.js'

import AvailabilityButton from '../../components/AvailabilityButton/AvailabilityButton'

import Cal from '../../components/Cal/Cal'

function UserEventsList({ match }) {
    const { convertToTime, convertFromTime } = timeUtils
    const [firstPage, goFirstPage, secondPage, goSecondPage, thirdPage, goThirdPage, fourthPage, goFourthPage] = usePages()
    const [ user ] = useUsers({id: match.params.user_id})
    const template_url = match.params.event_template_url
    const [availability, fetchAvailability] = useAvailability(match.params.user_id)

    const [templates, setTemplates] = useState([])
    const [loading, setLoading] = useState(true)
    const [template, setTemplate] = useState(null)
    const [showTimes, setShowTimes] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState('')

    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        loadTemplates()
    }, [])


    const loadTemplates = async () => {
        try {
            const res = await eventTemplates.getTemplates(match.params.user_id)
            // console.log("Templates: ", res.data.data)
            setTemplates(res.data.data)
            setLoading(!loading)
        } catch (err) {
            throw err
        }
    }

    //todo -- use this method to get the id of the template from the url. we can then use this to display the proper event template
    const get_template_id = (template_url) => {
        var template_id
        if (templates.length > 0) {
            template_id = (templates.find(el => el.url == template_url) || {}).id
        }
        return template_id
    }

    const calcDisplayTimes = (time) => {
        const increment = template.duration / 15
        // console.log('increment: ', increment)
        // console.log('begin and end codec: ', time.begin_time_unit, time.end_time_unit)
        const diff = Math.abs(time.end_time_unit - time.begin_time_unit)
        const iterations = diff % increment > 0 ? (diff / increment) - (diff % increment) : diff / increment
        // console.log('iterations: ', iterations)
        let currentTime = time.begin_time_unit

        let printableTimes = []

        for (let i = 0; i < iterations; i++) {
            printableTimes.push(convertToTime(currentTime, currentTime + increment))
            currentTime += increment
        }
        // console.log("times for display: ", printableTimes)

        return printableTimes
    }

    const activeDays = () => {
        const active = availability.map(day => day.length > 0)
        return active
    }

    const scheduleEvent = async () => {
        const { beginCodec, endCodec } = convertFromTime(selectedTime)

        try {
            //do not use reducer or context for api calls as these will be relying on different data sources
            const eventRes = await userEvents.createEvent(10, 10, title, desc, 1, beginCodec, endCodec, selectedDate.toISOString(), true)
            const eventId = eventRes.data.data.id
            const inviteRes = await eventInvites.createInvite(10, eventId, user.email, user.id, undefined, 0)
            console.log("schedule result?: ", inviteRes)
            goFourthPage()
        } catch (err) {
            alert(err)
        }
    }

    const templateClick = (e, template) => {
        e.preventDefault()
        goSecondPage()
        setTemplate(template)
        // fetchAvailability()
        // console.log('secondpage?: ', secondPage)
    }

    const backClick = (e) => {
        e.preventDefault()
        if (secondPage) {
            goFirstPage()
        }
        if (thirdPage) {
            goSecondPage()
        }
    }

    const dayClick = useCallback((date) => {
        setSelectedDate(date)
        setShowTimes(true)
    }, [])

    const selectTime = useCallback((time) => {
        setSelectedTime(time)
        goThirdPage()
    }, [])

    const photo = localStorage.getItem('profilePhoto') || ''

    const first = () => (
        <>
            <Box>
                <Flex w='100%' justifyContent='center' alignItems="center" display="inline-flex">
                    <Avatar mr="10px" name={localStorage.getItem("username") != null ? localStorage.getItem('username') : null} src={user.photo || "./sample_avi.png"} />
                    <Heading size="md">{user.username}</Heading>
                </Flex>
                <Text fontSize="sm" color="gray.500">{user.email}</Text>
                <Text mt="30px" fontSize="md">Follow the instructions to schedule an event with me!</Text>
            </Box>
            <Flex mt="60px" direction="column">
                {
                    !loading ?
                        templates.map(template => template.active ? (
                            <a href='' onClick={e => templateClick(e, template)} key={template.id}>
                                <Flex mb="30px" pl="15px" pr="10px" py="20px" direction="row" align="center" border="1px" borderColor="gray.100" rounded="md" _hover={{ backgroundColor: 'gray.100' }}>
                                    <Heading size="md">{template.title}</Heading>
                                    <Icon as={MdNavigateNext} boxSize="2em" />
                                </Flex>
                            </a>
                        ) : null)

                        :
                        <Spinner />
                }

            </Flex>
        </>
    )

    const second = () => (
        <Flex w="100%">
            <Flex justifyContent="center" align="center">
                <a onClick={backClick} href='!#'>
                    <Circle size='40px' shadow='md' mx="15px">
                        <Icon as={MdArrowBack} />
                    </Circle>
                </a>
            </Flex>
            <Flex px="15px" w="35%">
                <Box>
                    <Flex w='100%' justifyContent='center' alignItems="center" display="inline-flex">
                        <Avatar mr="10px" name={user.username} src={user.photo || "./sample_avi.png"} />
                        <Heading size="md">{user.username}</Heading>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">{user.email}</Text>
                    <Heading size="md" mt="15px">{`Event: ${template.title}`}</Heading>
                    <Box>
                        <Icon as={MdAccessTime} display="inline-block" mr="10px" />
                        <Text fontSize="md" display="inline-block">{`Duration: ${template.duration} min`}</Text>
                    </Box>
                </Box>
            </Flex>
            <Flex direction="column" justifyContent="flex-start" w="50%" px="15px" borderLeft="1px" borderColor="gray.200">
                <Box align="left">
                    <Heading size="md">Select Date & Time</Heading>
                </Box>
                <Box maxW="350px">
                    <Cal
                        defaultDate={selectedDate}
                        dayClick={dayClick}
                        activeDays={activeDays()}
                    />
                </Box>
            </Flex>
            <Flex>
                {showTimes ? times() : null}
            </Flex>
        </Flex>
    )

    const third = () => (
        <Flex w="100%">
            <Flex justifyContent="center" align="center">
                <a onClick={backClick} href='!#'>
                    <Circle size='40px' shadow='md' mx="15px">
                        <Icon as={MdArrowBack} />
                    </Circle>
                </a>
            </Flex>
            <Flex px="15px" w="45%">
                <Box>
                    <Flex w='100%' justifyContent='center' alignItems="center" display="inline-flex">
                        <Avatar mr="10px" name={localStorage.getItem("username") != null ? localStorage.getItem('username') : null} src={user.photo || "./sample_avi.png"} />
                        <Heading size="sm">{user.username}</Heading>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">{user.email}</Text>
                    <Heading size="md" my="15px">{`Event: ${template.title}`}</Heading>
                    <Box mb="15px">
                        <Icon as={MdAccessTime} display="inline-block" mr="10px" />
                        <Text fontSize="md" display="inline-block">{`Duration: ${template.duration} min`}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="md" display="inline-block"><Icon as={MdDateRange} display="inline-block" mr="10px" />{`${selectedTime[0]} - ${selectedTime[1]}, ${selectedDate}`}</Text>
                    </Box>
                </Box>
            </Flex>
            <Flex direction="column" justifyContent="space-between" w="50%" minH="500px" px="15px" borderLeft="1px" borderColor="gray.200">
                <Heading size="sm">Enter Details:</Heading>
                <InputGroup>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <InputRightAddon children="Title" />
                </InputGroup>
                <InputGroup>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputRightAddon children="Email" />
                </InputGroup>
                <Textarea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
                <Button onClick={scheduleEvent}>Schedule</Button>
            </Flex>
        </Flex>
    )

    const fourth = () => (
        <>
            <Box>
                <Flex w='100%' justifyContent='center' alignItems="center" display="inline-flex">
                    <Avatar mr="10px" name={localStorage.getItem("username") != null ? localStorage.getItem('username') : null} src="./sample_avi.png" />
                    <Heading size="md">{user.username}</Heading>
                </Flex>
                <Text fontSize="sm" color="gray.500">{user.email}</Text>
            </Box>
            <Flex mt="60px" direction="column">
                <Heading size="lg" >Invite Sent!</Heading>
            </Flex>
        </>
    )

    const times = () => {
        const day = selectedDate.getDay()
        console.log('selected day: ', selectedDate.getDay())
        console.log('availability day: ', availability[day])
        const pairs = availability[day].reduce(( acc, time) => {
            console.log('calc times: ', calcDisplayTimes(time))
            acc = acc.concat(calcDisplayTimes(time))
            console.log('pairs: ', acc)
            return acc

        }, [])
        return (
            <Flex direction="column" justifyContent="flex-start" align="center" minW={showTimes ? '250px' : ''} maxH="435px" overflowY="scroll">
                {
                    availability[day].length > 0 ?
                        pairs.map((pair, i) => {
                            // console.log('pair: ', pair)
                            return (
                                <AvailabilityButton
                                    time={pair}
                                    onConfirm={selectTime}
                                    key={`${i}`}
                                />
                            )
                        })
                        :
                        <Box>
                            <Text fontSize="sm">No Availability</Text>
                        </Box>
                }
            </Flex>
        )

    }

    // let id = match.params.user_id
    return (
        <Flex minH="100%" w="100%" py="30px" alignItems='start' justifyContent='center' background="gray.50">
            <Flex minW='900px' flexDirection="column" alignItems="center" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="30px" background="white" boxShadow="md">
                {firstPage ? first() : null}
                {secondPage ? second() : null}
                {thirdPage ? third() : null}
                {fourthPage ? fourth() : null}
            </Flex>
        </Flex>
    )
}

UserEventsList.displayName = "UserEventsList"
export default withRouter(UserEventsList);
