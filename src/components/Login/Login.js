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
import { useTranslation, Trans } from 'react-i18next'

function Login() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    let history = useHistory()
    const { t, i18n } = useTranslation()

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
                        errors.email = `${t('description.required')}`
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = `${t('description.invalidEmail')}`
                    } else if (values.email.length > 25) {
                        errors.email = `${t('description.longEmail')}`
                    }
                    if (!values.password) {
                        errors.password = `${t('description.required')}`
                    } else if (values.password.length < 8) {
                        errors.password = `${t('description.longPassword')}`
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
                                <FormLabel htmlFor="email">{t('description.emailTitle')}</FormLabel>
                                <Input {...field} id="email" placeholder={`${t('description.emailTitle')}`} />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        {/* PASSWORD */}
                        <Field name="password">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">{t('description.passwordTitle')}</FormLabel>
                                    <InputGroup>
                                        <Input 
                                            type={show ? "text" : "password"} 
                                            {...field}
                                            id="password" 
                                            placeholder={`${t('description.passwordTitle')}`}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                {show ? `${t('description.hide')}` : `${t('description.show')}`}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={6} colorScheme="teal" type="submit" variant="ghost">
                            {`${t('description.signin')}`}
                        </Button>
                        </Form>
                )}
            </Formik>
            </VStack>
      </Center>
    )
}

export default Login;
