import { useState, useCallback, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Text,
    Textarea,
    InputGroup,
    Input,
    InputRightAddon,
    InputLeftAddon,
    Select,
    Button,
} from "@chakra-ui/react"

import { useTemplatesDispatch } from '../../hooks/useTemplates'

import './TemplateModal.scss'

function TemplateModal({ label }) {
    const username = localStorage.getItem('username')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [duration, setDuration] = useState('')
    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [page, setPage] = useState(1)
    const [template, setTemplate] = useState({
        title: '',
        desc: '',
        duration: '',
        url: '',
        active: true
    });

    const { createTemplate } = useTemplatesDispatch()

    const onNext = () => {
        setTemplate({
            title,
            desc,
            url,
            duration
        })
        setPage(2)
    }

    const closeModal = () => {
        setPage(1)
        onClose()
    }

    const onSave = async () => {
        const res = await createTemplate(
            template.title,
            parseInt(template.duration),
            template.desc,
            true,
            template.url
        )
        setPage(1)
        onClose()
    }

    const firstPage = () => (
        <Flex direction='column' justifyContent="space-between" minH="220px">
            <InputGroup>
                <Select
                    placeholder={label.placeholder}
                    size='md'
                    onChange={e => setDuration(e.target.value)}
                    isRequired
                >
                    <option value="15">15 Minute</option>
                    <option value="30">30 Minute</option>
                    <option value="60">60 Minute</option>
                </Select>
        // <InputRightAddon children='Meeting' />
            </InputGroup>
            <InputGroup>
                <Input
                    placeholder="Template Name"
                    size='md'
                    onChange={e => setTitle(e.target.value)}
                />
                {// <InputRightAddon children='Title' />
                }
            </InputGroup>
            <InputGroup>
                <InputLeftAddon children={`dimes-app.com/${username}/`} />
                <Input
                    placeholder="Public Url"
                    size='md'
                    onChange={e => setUrl(e.target.value)}
                />
                {// <InputRightAddon children='Title' />
                }
            </InputGroup>
            <InputGroup>
                <Textarea
                    placeholder="Template Description"
                    onChange={e => setDesc(e.target.value)}
                />
                {// <InputRightAddon children='Description' />
                }
            </InputGroup>
        </Flex>
    )

    const secondPage = () => (
        <Flex direction='column' justifyContent="space-between" alignItems="center" minH="120px">
            <Text>{template.title}</Text>
            <Text>{template.desc}</Text>
            <Text>{template.url}</Text>
            <Text>{template.duration}</Text>
        </Flex>
    )

    return (
        <>
            <Button onClick={onOpen} leftIcon={label.icon} fontSize="sm" variant="outline">{label.button}</Button>

            <Modal isOpen={isOpen} onClose={closeModal} size='sm'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{label.title}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {
                            page == 1 ?
                                firstPage()
                                :
                                secondPage()
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={page == 1 ? onNext : onSave}>{page == 1 ? label.secondary : 'Save'}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

TemplateModal.displayName = "TemplateModal"
export default TemplateModal;
