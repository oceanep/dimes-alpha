import React, { useState, useEffect, useLayoutEffect } from 'react';
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
    IconButton,
    FormErrorMessage,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import userApi from '../../utils/user_api.js'
import { Formik, Form, Field } from 'formik'
import { useTranslation, Trans } from 'react-i18next'
import { FaGoogle } from "react-icons/fa"
import LandingNav from '../LandingNav/LandingNav.jsx'
import LandingFooter from '../LandingFooter/LandingFooter'
import GoogleSignin from '../Google/GoogleSignin.jsx'


function Signup() {

    useEffect(() => {
        window.addEventListener('dataLoaded', () => {window.location.href="/home"})        
    },[])
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const [authToken, setAuthToken] = useState('')
    const [username, setUsername] = useState('')
    const handlePasswordClick = () => setShowPassword(!showPassword)
    const handleConfirmPasswordClick = () => setConfirmShowPassword(!showConfirmPassword)
    let history = useHistory()
    const { t, i18n } = useTranslation()
    
    const responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('token', response.tokenId);
        localStorage.setItem('username', response.profileObj.givenName);
        history.push('/home')    
    }

    const initSignin = () =>{
        window.initSignin();
        window.authorizeButton.click();
    }
    
    return (
        <>
      <LandingNav/>
      <Center className="Signup">
          <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
          >
            <Formik
                initialValues={{ userName: "", email: "", firstName: "", lastName: "", password: "", confirmPassword: "" }}
                onSubmit={async (values) => {
                    try {
                        const response = await userApi.signupUser(values.email, values.userName, values.firstName, values.lastName, values.password).then((res) => {
                            const { token, username } = res.data
                            setUsername(username)
                            setAuthToken(token)
                        })
                        //const { token, username } = response.data
                        localStorage.setItem('token', authToken)
                        localStorage.setItem('username', username)
                        history.push('/home')
                    } catch {
                        alert('Something went wrong, please try again')
                    }
                }}
                validate={values => {
                    const errors = {}

                    if (!values.userName) {
                        errors.userName = `${t('form.required')}`
                    } else if (values.userName.length > 10) {
                        errors.userName = `${t('form.signup.longUsername')}`
                    } else if (values.userName.length < 3) {
                        errors.userName = `${t('form.signup.shortUsername')}`
                    }

                    if (!values.email) {
                        errors.email = `${t('form.required')}`
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = `${t('form.invalidEmail')}`
                    } else if (values.email.length > 25) {
                        errors.email = `${t('form.longEmail')}`
                    }

                    if (!values.password) {
                        errors.password = `${t('form.required')}`
                    } else if (values.password.length < 8) {
                        errors.password = `${t('form.longPassword')}`
                    }

                    if (!values.firstName) errors.firstName = `${t('form.required')}`
                    if (!values.lastName) errors.lastName = `${t('form.required')}`

                    if (!values.confirmPassword) {
                        errors.confirmPassword = `${t('form.signup.confirmPassword')}`
                    } else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = `${t('form.signup.matchingPassword')}`
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
                                <FormLabel htmlFor="email">{t('form.emailTitle')}</FormLabel>
                                <Input {...field} id="email" placeholder={`${t('form.emailTitle')}`} />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        {/* USERNAME */}
                        <Field name="userName">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.userName && form.touched.userName}>
                                <FormLabel htmlFor="userName">{t('form.signup.usernameTitle')}</FormLabel>
                                <Input {...field} id="userName" placeholder={`${t('form.signup.usernameTitle')}`} />
                                <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        {/* FIRST NAME */}
                        <Field name="firstName">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                    <FormLabel htmlFor="firstName">{t('form.signup.firstName')}</FormLabel>
                                    <Input {...field} id="firstName" placeholder={`${t('form.signup.firstName')}`} />
                                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {/* LAST NAME */}
                        <Field name="lastName">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                    <FormLabel htmlFor="lastName">{t('form.signup.lastName')}</FormLabel>
                                    <Input {...field} id="lastName" placeholder={`${t('form.signup.lastName')}`} />
                                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {/* PASSWORD */}
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">{t('form.passwordTitle')}</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            id="password"
                                            placeholder={`${t('form.passwordTitle')}`}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                                                {showPassword ? `${t('form.hide')}` : `${t('form.show')}`}
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
                                    <FormLabel htmlFor="confirmPassword">{t('form.signup.confirmPassword')}</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...field}
                                            id="confirmPassword"
                                            placeholder={`${t('form.signup.confirmPassword')}`}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleConfirmPasswordClick}>
                                                {showConfirmPassword ? `${t('form.hide')}` : `${t('form.show')}`}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={6} colorScheme="teal" type="submit" variant="ghost">{`${t('header.register')}`}</Button>
                        </Form>
                )}
            </Formik>            
            <GoogleSignin display_text = "Signup with Google"/>
          </VStack>
      </Center>
      <LandingFooter/>
      </>
    )
}

export default Signup;
