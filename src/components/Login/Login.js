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
import { useHistory } from "react-router-dom"
import './Login.css'
import userApi from '../../utils/user_api.js'
import { Formik, Form, Field } from 'formik';
import { useTranslation, Trans } from 'react-i18next'

import LandingNav from '../LandingNav/LandingNav.jsx'
import LandingFooter from '../LandingFooter/LandingFooter'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    let history = useHistory()
    const { t, i18n } = useTranslation()
    const notify = () => toast('Error With Email or Password', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return (
      <>
      <LandingNav/>
        <Center className="Login" minH="80%">
          <ToastContainer />
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
                        console.log("FResponse: ", response);
                        notify();
                    } else {
                        console.log("Response: ", response);
                        const { token, username, id } = response.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('username', username)
                        localStorage.setItem('userId', id)
                        history.push('/home')
                    }
                }}
                validate={values => {
                    const errors = {}
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
                        {/* PASSWORD */}
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">{t('form.passwordTitle')}</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={show ? "text" : "password"}
                                            {...field}
                                            id="password"
                                            placeholder={`${t('form.passwordTitle')}`}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                {show ? `${t('form.hide')}` : `${t('form.show')}`}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={6} colorScheme="teal" type="submit" variant="ghost">
                            {`${t('header.signin')}`}
                        </Button>
                        </Form>
                )}
            </Formik>
            </VStack>
      </Center>
      <LandingFooter/>
      </>
    )
}

export default Login;
