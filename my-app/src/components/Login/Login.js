import React, {useState} from 'react';
import { 
    Textarea,
    Input,
    InputRightElement,
    Button,
    InputGroup,
    Box,
    Wrap, 
    WrapItem,
    Text,
    ButtonGroup,
    Container,
    VStack, 
    StackDivider,
    Link
} from "@chakra-ui/react"
import { Link as ReachLink } from "@reach/router"
import './Login.css'

function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    
    const handleClick = () => setShow(!show)

    const handleSubmit = () => alert(`Username: ${username}, Password: ${password}`)

    const handleUsernameChange = (e) => {
      let inputValue = e.target.value
      setUsername(inputValue)
    }

    const handlePasswordChange = (e) => {
        let inputValue = e.target.value
        setPassword(inputValue)
    }

    return (
      <div className="Login">
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
            >
                <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={"text"}
                            placeholder="Enter username"
                            onChange={handleUsernameChange}
                        />
                </InputGroup>
                <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                </InputGroup>
                    <Button colorScheme="teal" variant="ghost" onClick={handleSubmit}>
                        Login
                    </Button>
                    <Link
                        as={ReachLink}
                        to="/signup"
                    >
                        Don't have an account?
                    </Link>
            </VStack>
      </div>
    )
}

export default Login;