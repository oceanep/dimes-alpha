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
    FormErrorMessage
} from "@chakra-ui/react"
import {
    Link,
    useHistory
  } from "react-router-dom";
import userApi from '../../utils/user_api.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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

            {/* <FormControl id="email" isRequired>
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
            </FormControl> */}

            <Formik
                initialValues={{ userName: "", email: "", firstName: "", lastName: "", password: "", confirmPassword: "" }}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await userApi.signupUser(values.email, values.userName, values.firstName, values.lastName, values.password)
                        const {
                            token,
                            username,
                        } = response.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('username', username)
                        history.push('/home')
                    } catch {
                        console.log(values, actions)
                        alert('Something went wrong, please try again')
                    }
                }}
                validate={values => {
                    const errors = {}

                    if (!values.userName) {
                        errors.userName = "Username is required"
                    } else if (values.userName.length > 10) {
                        errors.userName = "Username must be less than 10 characters"
                    } else if (values.userName.length < 3) {
                        errors.userName = "Username must be at least 3 characters"
                    }

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
                    if (!values.firstName) errors.firstName = "First name is required"
                    if (!values.lastName) errors.lastName = "Last name is required"

                    if (!values.confirmPassword) {
                        errors.confirmPassword = "Confirm password"
                    } else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = "Passwords must match"
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
                        {/* USERNAME */}
                        <Field name="userName">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.userName && form.touched.userName}>
                                <FormLabel htmlFor="userName">Username</FormLabel>
                                <Input {...field} id="userName" placeholder="Username" />
                                <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        {/* FIRST NAME */}
                        <Field name="firstName">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input {...field} id="firstName" placeholder="firstName" />
                                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {/* LAST NAME */}
                        <Field name="lastName">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                    <Input {...field} id="lastName" placeholder="lastName" />
                                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
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
                                            type={showPassword ? "text" : "password"} 
                                            {...field} 
                                            id="password" 
                                            placeholder="password" 
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {/* CONFIRM PASSWORD */}
                        <Field name="confirmPassword">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                    <InputGroup>
                                        <Input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            {...field} 
                                            id="confirmPassword" 
                                            placeholder="confirmPassword" 
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleConfirmPasswordClick}>
                                                {showConfirmPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={6} colorScheme="teal" type="submit" variant="ghost">
                            Submit
                        </Button>
                        </Form>
                )}
            </Formik>

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
