import React, {useState} from 'react';
import {
    Input,
    InputRightElement,
    Button,
    InputGroup,
    VStack, 
    StackDivider,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Field,
    Form,
} from "@chakra-ui/react"
import {
    Link
  } from "react-router-dom";
import { Formik } from 'formik' // can use this library for easy form validation

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const handlePasswordClick = () => setShowPassword(!showPassword)
    const handleConfirmPasswordClick = () => setConfirmShowPassword(!showConfirmPassword)

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

    const handleSubmit = () => {
        if (password != confirmPassword) {
            alert('passwords don\'t match')
        } else {
            alert(`Email: ${email}\nName: ${name}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`)
        }
    }

    return (
      <div className="Signup">
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
      </div>
    )
}

export default Signup;