import React, {useState} from 'react';
import {
    Center,
    Input,
    InputRightElement,
    Button,
    InputGroup,
    VStack,
    StackDivider,
} from "@chakra-ui/react"
import {
    Link
  } from "react-router-dom";
import './Login.css'

function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)

    const handleSubmit = () => alert(`Username: ${username}\nPassword: ${password}\n`)

    const handleUsernameChange = (e) => {
      let inputValue = e.target.value
      setUsername(inputValue)
    }

    const handlePasswordChange = (e) => {
        let inputValue = e.target.value
        setPassword(inputValue)
    }

    return (
      <Center className="Login" minH="80%">
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
                        to="/signup"
                    >
                        Don't have an account?
                    </Link>
            </VStack>
      </Center>
    )
}

export default Login;
