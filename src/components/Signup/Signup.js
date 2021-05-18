import React, {useState} from 'react';
import {
    Center,
    Input,
    InputRightElement,
    Button,
    InputGroup,
    VStack,
    StackDivider,
    FormControl,
    FormLabel,
    FormHelperText,
} from "@chakra-ui/react"
import {
    Link,
    useHistory
  } from "react-router-dom";
import userApi from '../../utils/user_api.js';

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const handlePasswordClick = () => setShowPassword(!showPassword)
    const handleConfirmPasswordClick = () => setConfirmShowPassword(!showConfirmPassword)
    let history = useHistory()
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")

    const handleEmailChange = (e) => {
        let inputValue = e.target.value
        setEmail(inputValue)
    }

    const handleNameChange = (e) => {
        let inputValue = e.target.value
        setName(inputValue)
      }

    const handlePasswordChange = (e) => {
        let inputValue = e.target.value
        setPassword(inputValue)
    }

    const handleConfirmPasswordChange = (e) => {
        let inputValue = e.target.value
        setConfirmPassword(inputValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await userApi.signupUser(email, name, name, name, password)
            const {
                token,
                username,
            } = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            history.push('/home')
        } catch {
            alert('PLEASE TRY AGAIN\nemail must be valid format\nname can not be more than 10 characters\npasswords must match and be > 8 chars')
        }
    }

    return (
      <Center className="Signup">
          <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
          >
            <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleEmailChange}/>
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="name" onChange={handleNameChange}/>
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? "text" : "password"} onChange={handlePasswordChange}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type="password" type={showConfirmPassword ? "text" : "password"} onChange={handleConfirmPasswordChange}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleConfirmPasswordClick}>
                            {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme="teal" variant="ghost" onClick={handleSubmit}>
                Signup
            </Button>

            <Link
                to="/login"
            >
                Already have an account?
            </Link>
          </VStack>
      </Center>
    )
}

export default Signup;
