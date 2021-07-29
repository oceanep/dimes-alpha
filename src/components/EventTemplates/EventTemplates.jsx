import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Button,
    Text,
    Avatar,
    Spinner
} from "@chakra-ui/react"
import { MdPlaylistAdd, MdPerson } from 'react-icons/md'

import EventCard from '../EventCard/EventCard'
import TemplateModal from '../TemplateModal/TemplateModal'
import { useTemplatesState, useTemplatesDispatch } from '../../hooks/useTemplates'
import eventTemplates from '../../utils/event_templates'

import styles from './EventTemplates.module.scss'
import QRCode from "react-qr-code";

function EventTemplates({ vertical }) {
    const { templates, loading, error } = useTemplatesState()
    const { deleteTemplate, editTemplate } = useTemplatesDispatch()

    useEffect(() => {
    }, [])


    return (
        <Box className="EventTemplates-container" w={vertical ? '' : '100%'}>
            <Flex w='100%' mb='4px' px="12px" pb="15px" borderBottom="2px" borderColor='gray.50' rounded='md'>
                <Flex w={vertical ? '' : '50%'} justifyContent='flex-start' alignItems="center" display="inline-flex">
                </Flex>
                {
                    vertical ? ''
                        :
                        <Flex w='50%' justifyContent='flex-end'>
                            <TemplateModal
                                label={{
                                    icon: <MdPlaylistAdd />,
                                    button: 'New Event Type',
                                    title: 'New Event Type',
                                    placeholder: 'Duration',
                                    secondary: 'next'
                                }}
                            />
                        </Flex>
                }
            </Flex>
            <Flex w="100%" flexDirection={vertical ? "column" : 'row'} flexWrap={vertical ? "nowrap" : "wrap"} justifyContent="flex-start" alignItems={vertical ? 'flex-start' : 'center'}>
                {
                    !loading && templates.length > 0 ?
                        templates.map((template, index) => {
                            return (
                                <Box key={index} p="12px" w="33.3333%" boxSizing="border-box">
                                    <EventCard
                                        type="Template"
                                        title={template.title}
                                        id={template.id}
                                        desc={template.desc}
                                        url={template.url}
                                        duration={template.duration}
                                        variant={template.variant}
                                        value={template.value}
                                        onDelete={deleteTemplate}
                                        onEditSave={editTemplate}
                                    />
                                </Box>
                            );
                        })
                        :
                        <Flex w="100%" justifyContent="center" align="center">
                          <Spinner size="xl" color="teal.500" />
                        </Flex>
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
