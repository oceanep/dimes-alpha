import React, { useState } from 'react'
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
    FormErrorMessage
} from "@chakra-ui/react"
import { Link, useHistory } from "react-router-dom"
import './Login.css'
import userApi from '../../utils/user_api.js'
import { Formik, Form, Field } from 'formik';

function Login() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    let history = useHistory()

    return (
      <Center className="Login" minH="80%">
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
            >
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                    const response = await userApi.loginUser(values.email, values.password)
                    if (response.statusText === "Login Failed") {
                        alert('Unable to find account')
                    } else {
                        const { token, username } = response.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('username', username)
                        history.push('/home')
                    }
                }}
                validate={values => {
                    const errors = {}
                    if (!values.email) {
                        errors.email = "Required"
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address"
                    } else if (values.email.length > 25) {
                        errors.email = "Email must be at most 25 characters"
                    }
                    if (!values.password) {
                        errors.password = "Password is required"
                    } else if (values.password.length < 8) {
                        errors.password = "Password must be at least 8 characters"
                    }
                    return errors
                }}
            >

                {() => (
                        <Form>
                        {/* EMAIL */}
                        <Field name="email" type="email">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input {...field} id="email" placeholder="Email" />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        {/* PASSWORD */}
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup>
                                        <Input 
                                            type={show ? "text" : "password"} 
                                            {...field} 
                                            id="password" 
                                            placeholder="Password" 
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                {show ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={6} colorScheme="teal" type="submit" variant="ghost">
                            Login
                        </Button>
                        </Form>
                )}
            </Formik>
            <Link to="/signup">Don't have an account?</Link>
            </VStack>
      </Center>
    )
}

export default Login;
