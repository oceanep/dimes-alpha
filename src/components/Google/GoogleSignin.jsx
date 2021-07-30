import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FaGoogle } from "react-icons/fa"
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
    Box
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import userApi from '../../utils/user_api.js'


const GoogleSignin = (props) => {
    var display_text = props.display_text;
    const initSignin = () => {
        window.initSignin();
        window.authorizeButton.click();
    }
    return (
        <Box>
            <Button onClick={initSignin} leftIcon={<FaGoogle />} id="authorize_button">{display_text}</Button>
            <Button id="signout_button" style={{ display: 'none' }}>Log Out</Button>
        </Box>
    );
}

export default GoogleSignin;
