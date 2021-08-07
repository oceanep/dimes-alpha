import {
    Text,
    Switch,
    Flex,
    Stack,
    HStack,
    Spacer,
    Spinner
} from "@chakra-ui/react"

import { useTemplatesState } from '../../hooks/useTemplates'

const ToggleTemplates = ({toggle}) => {

  const { templates, loading, error } = useTemplatesState()

  return (
    <Flex direction={["column", "row"]} flexWrap="wrap" overflowY="scrollable" mt="24px" maxW="636px" maxH="396px">
      {
        !loading ?
          templates.map( (template, i) => (
            <HStack key={template.id} backgroundColor="white" mb="24px" ml={["","12px"]} shadow="md" h="3em" minW="300px" px="12px">
              <Text fontSize="md" >{template.title}</Text>
              <Spacer/>
              <HStack>
                <Text fontSize="md">Active?</Text>
                <Switch defaultIsChecked={template.active} onChange={ e => toggle(template, e.target.checked)}/>
              </HStack>
            </HStack>
          ))
        :
          <Flex justifyContent="center" align="center">
            <Spinner size="xl" color="teal.500" />
          </Flex>
      }
    </Flex>
  )
}

export default ToggleTemplates
