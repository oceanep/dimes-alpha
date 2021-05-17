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
import { Link, useHistory } from "react-router-dom";
import './Login.css'
import userApi from '../../utils/user_api.js';

function Login() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    let history = useHistory()
    const handleClick = () => setShow(!show)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await userApi.loginUser(email, password)
        console.log(response)
        if (response.statusText === "Login Failed") {
            alert('please try logging in again')
        } else {
            const {
                token,
                username,
            } = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            history.push('/home')
        }
    }

    const handleEmailChange = (e) => {
      let inputValue = e.target.value
      setEmail(inputValue)
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
                            placeholder="Enter email"
                            onChange={handleEmailChange}
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
