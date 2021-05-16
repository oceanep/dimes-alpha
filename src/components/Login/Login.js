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
    Link,
    useHistory
  } from "react-router-dom";
import './Login.css'
import axios from 'axios'

function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    let history = useHistory()
    const handleClick = () => setShow(!show)

    const handleSubmit = async () => {
        // // make api call
        // const res = await axios.post('api/users/login', { 
        //         "user": {
        //             "email": username,
        //             "password": password,
        //         }
        // })
        // // assign variables using response object
        // const {
        //     email,
        //     id,
        //     token,
        //     username,
        //     first_name,
        //     last_name
        // } = res.data.json.user
        // // set local storage
        // localStorage.setItem('token', token)
        // localStorage.setItem('username', username)
        // re-direct to homepage
        history.push('/home')

    }

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
