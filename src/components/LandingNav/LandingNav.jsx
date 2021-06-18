import {
    Box,
    Flex,
    Button,
    Spacer,
    Image,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom"

function LandingNav() {
    let history = useHistory()
    const { t } = useTranslation()
    const logout = () => {
        window.gapi.auth2.getAuthInstance().signOut();
        localStorage.clear();
        history.push("/");
    };

    return (
        <nav>
            <Flex mx={"60px"} my="15px">
                <Box>
                    <Link to={localStorage.getItem("token") != null ? '/home' : '/'}><Image maxW="100px" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/dimes_logo_2.png" alt="Dimes Logo" /></Link>
                </Box>
                <Spacer />
                {localStorage.getItem("username") != null ? `Hello, ${localStorage.getItem('username')}` : null}
                {localStorage.getItem("token") != null ? <div><Button onClick={logout} colorScheme="teal" size="md" ml="15px">{`${t('header.logout')}`}</Button></div> : <div><Link to='/signup'><Button colorScheme="teal" size="md" ml="15px">{`${t('header.register')}`}</Button></Link><Link to='/login'><Button colorScheme="teal" size="md" ml="15px">{`${t('header.signin')}`}</Button></Link></div>}
            </Flex>
        </nav>
    );
}

export default LandingNav;
