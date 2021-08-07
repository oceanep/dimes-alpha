import { useState, useEffect, useCallback } from "react"
import withMenu from '../withMenu/withMenu'
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    VStack,
    Button,
    Switch,
    Skeleton
} from "@chakra-ui/react"
//import moment from 'moment-timezone';

import useUsers from '../../hooks/useUsers'
import useToggle from '../../hooks/useToggle'
import { useTemplatesDispatch } from '../../hooks/useTemplates'


import EditSettings from '../../components/EditSettings/EditSettings'
import PreviewSettings from '../../components/PreviewSettings/PreviewSettings'

function Settings() {

    const handleGoogleContacts = (e) => {
        //Check if the user is already signedin
        //console.log("Signed in: ", window.gapi.auth2.getAuthInstance().isSignedIn.get())
        console.log("Value: ", e.target.checked);
    }

    const [user, loading, updateUser] = useUsers()
    const [showPreview, setShowPreview] = useToggle()
    const { editTemplate } = useTemplatesDispatch()
    // console.log(user)

    const [newFirstName, setFirstName] = useState(user.firstName)
    const [newLastName, setLastName] = useState(user.lastName)
    const [newUsername, setUsername] = useState(user.username)
    const [newEmail, setEmail] = useState(user.email)
    const [newBlurb, setBlurb] = useState(user.blurb)
    const [newPhoto, setPhoto] = useState(user.photo || '')
    const [gContacts, setGContacts] = useState(false)
    const [gEvents, setGEvents] = useState(false)
    const [templates, setTemplates] = useState([])

    useEffect(() => {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setUsername(user.username)
      setEmail(user.email)
      setBlurb(user.blurb)
    }, [user] )

    const toggleActive = (template, value) => {
      const filteredTemplates = templates.length > 0 ? templates.filter( t => t.id != template.id ) : []
      setTemplates([...filteredTemplates, {...template, active: value}])
    }

    const onSave = async () => {
      const [ userRes, templateRes ] = await Promise.all([ updateUser(newFirstName, newLastName, newUsername, newEmail, newBlurb, newPhoto), Promise.all(templates.map( async (template) => editTemplate(template.id, template.title, template.duration, template.desc, template.active, template.url)))])
      console.log('save res: ', userRes, templateRes)
    }

    //console.log("Time Zones: ", moment.tz.names());
    return (
        <Box>
          <Flex className="settings-container" minH="100%" w="100%" alignItems='start' justifyContent='center'>
            <Flex minW='800px' w="1200px" flexDirection="column" justifyContent="space-between" mt="30px" mb="60px" py="30px" px="15px" background="white" boxShadow="md">
              {
                loading ?
                  <Stack>
                    <Skeleton height="60px" />
                    <Skeleton height="60px" />
                    <Skeleton height="60px" />
                    <Skeleton height="60px" />
                  </Stack>
                :
                !showPreview && !loading ?
                  <EditSettings
                    newFirstName={newFirstName}
                    onFirstChange={setFirstName}
                    newLastName={newLastName}
                    onLastChange={setLastName}
                    newUsername={newUsername}
                    onUnChange={setUsername}
                    newEmail={newEmail}
                    onEmailChange={setEmail}
                    newBlurb={newBlurb}
                    onBlurbChange={setBlurb}
                  />
                :
                  <PreviewSettings
                    newFirstName={newFirstName}
                    newLastName={newLastName}
                    newUsername={newUsername}
                    newEmail={newEmail}
                    newBlurb={newBlurb}
                    toggleActive={toggleActive}
                  />
              }

              <VStack
                spacing={4}
                align="stretch"
                mt="20px"
              >
                <Stack direction={["column", "row"]} spacing="24px" justify="flex-end">
                  <Button variant="outline" colorScheme="blue" onClick={setShowPreview}>{!showPreview ? "Preview" : "Settings"}</Button>
                  <Button colorScheme="blue" onClick={onSave}>Save</Button>
                </Stack>
                <Stack direction={["column", "row"]} spacing="24px" borderTop="1px solid" borderColor="gray.200" pt="12px">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="google-contact" mb="0">
                        Import Google Contacts?
                    </FormLabel>
                    <Switch id="email-alerts" value={gContacts} onChange={ () => setGContacts(!gContacts) }/>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="google-events" mb="0">
                        Import Google Events?
                    </FormLabel>
                    <Switch id="email-alerts" value={gEvents} onChange={ () => setGEvents(!gEvents) }/>
                  </FormControl>
                </Stack>
              </VStack>
            </Flex>
          </Flex>
        </Box>
    );
}

Settings.displayName = "Settings"
export default withMenu(Settings);
