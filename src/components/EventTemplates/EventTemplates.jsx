import {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    Button,
    Text,
    Avatar,
    Skeleton
} from "@chakra-ui/react"
import { MdPlaylistAdd, MdPerson } from 'react-icons/md'

import EventCard from '../EventCard/EventCard'
import TemplateModal from '../TemplateModal/TemplateModal'
import useTemplates from '../../hooks/useTemplates'
import eventTemplates from '../../utils/event_templates'

import styles from './EventTemplates.module.scss'
import QRCode from "react-qr-code";

function EventTemplates({ vertical }) {
  const userId = localStorage.userId
  const templates = useTemplates(eventTemplates.getTemplates, userId)

  const [loading, setLoading] = useState(true)

  // const [templates, setTemplates] = useState([])

  useEffect( () => {
    if (templates && templates !== null){
      setLoading(false)
    }
  }, [templates])


  return (
    <Box className="EventTemplates-container" w={ vertical ? '' : '100%'}>
      <Flex w='100%' mb='4px' px="12px" pb="15px" borderBottom="2px" borderColor='gray.50' rounded='md'>
        <Flex w={ vertical ? '' : '50%'} justifyContent='flex-start' alignItems="center" display="inline-flex">
          <Avatar mr="10px"name={localStorage.getItem("username") != null ? localStorage.getItem('username') : null} src="./sample_avi.png" />
          <Text fontSize="md" display="inline-block">{localStorage.getItem("username") != null ? localStorage.getItem('username') : null}</Text>
        </Flex>
        {
          vertical ? ''
          :
          <Flex w='50%' justifyContent='flex-end'>
            <TemplateModal
              label={{
                icon: <MdPlaylistAdd/>,
                button: 'New Event Template',
                title: 'New Event Template',
                placeholder: 'Duration',
                secondary: 'next'
              }}
            />
          </Flex>
        }
      </Flex>
      <Flex w="100%" flexDirection={ vertical ? "column" : 'row' } flexWrap={ vertical ? "nowrap" : "wrap"} justifyContent="flex-start" alignItems={ vertical ? 'flex-start' : 'center'}>
        {
          templates.length > 0 ?
            templates.map((template, index) => {
              return(
                <Box key={index} p="12px" w="33.3333%" boxSizing="border-box">
                  <EventCard
                    title={template.title}
                    desc={template.desc}
                    variant={template.variant}
                    value={template.value}
                  />
                </Box>
              );
            })
          :
            ''
        }
      </Flex>
    </Box>
  );
}

EventTemplates.defaultProps = {
  vertical: false
}

EventTemplates.displayName = "EventTemplates"
export default EventTemplates;
