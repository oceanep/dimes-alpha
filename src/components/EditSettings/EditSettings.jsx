import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    Textarea,
    Switch,
    VStack,
    StackDivider,
} from "@chakra-ui/react"

const EditSettings = ({newFirstName, newLastName, newUsername, newEmail, newBlurb, gContacts, gEvents, onFirstChange, onLastChange, onUnChange, onEmailChange, onBlurbChange, toggleGEvents, toggleGContacts}) => {
  return (
    <VStack
      spacing={4}
      align="stretch"
    >
      <Stack direction={["column", "row"]} spacing="24px">
        <FormControl id="first-name" >
          <InputGroup>
            <InputLeftAddon children="First Name" />
            <Input
              placeholder={newFirstName}
              value={newFirstName}
              onChange={ e => onFirstChange(e.target.value) }
            />
          </InputGroup>
        </FormControl>
        <FormControl id="last-name" >
          <InputGroup>
            <InputLeftAddon children="Last Name" />
            <Input
              placeholder={newLastName}
              value={newLastName}
              onChange={ e => onLastChange(e.target.value) }
            />
          </InputGroup>
        </FormControl>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <FormControl id="username" >
          <InputGroup>
            <InputLeftAddon children="Username" />
            <Input
              placeholder={newUsername}
              value={newUsername}
              onChange={ e => onUnChange(e.target.value) }
            />
          </InputGroup>
        </FormControl>
        <FormControl id="email" >
          <InputGroup>
            <InputLeftAddon children="Email" />
            <Input
              placeholder={newEmail}
              value={newEmail}
              onChange={ e => onEmailChange(e.target.value) }
            />
          </InputGroup>
        </FormControl>
      </Stack>
      <Stack direction={["column", "row"]} spacing="24px">
        <FormControl id="blurb" >
          <InputGroup>
            <Textarea
              placeholder={newBlurb || "About You"}
              value={newBlurb}
              onChange={ e => onBlurbChange(e.target.value) }
            />
          </InputGroup>
        </FormControl>
      </Stack>
    </VStack>
  )
}

export default EditSettings
