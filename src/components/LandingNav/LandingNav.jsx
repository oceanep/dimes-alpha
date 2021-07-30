import {
    Box,
    Flex,
    Button,
    Spacer,
    Image,
    Avatar,
    AvatarBadge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
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
    const photo = localStorage.getItem('profilePhoto') || ''
    return (
        <nav>
            <Flex mx={"60px"} py="10px" alignItems="center" zindex="999" position="relative" >
                <Box>
                    <Link to={localStorage.getItem("token") != null ? '/home' : '/'}><Image maxW="100px" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/dimes_logo_2.png" alt="Dimes Logo" /></Link>
                </Box>
                <Spacer />
                {localStorage.getItem("token") != null ?
                    < Menu zindex="999" >
                        <MenuButton
                            id="menubutton"
                            as="button"
                            transition="all 0.2s"
                            zindex="999"
                        >
                            <Avatar size="md" src={photo} id="menuavi">
                                <AvatarBadge boxSize="1.25em" bg="green.500">
                                    5
                                </AvatarBadge>
                            </Avatar>
                            <MenuList>
                                <MenuGroup title="Profile">
                                    <MenuItem ><Link to='/settings'>Settings</Link></MenuItem>
                                    <MenuItem >Notifications (5)</MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup title="Help">
                                    <MenuItem>Docs</MenuItem>
                                    <MenuItem>FAQ</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </MenuButton>
                    </Menu> : null}

                {localStorage.getItem("token") != null ? <div><Button onClick={logout} colorScheme="teal" size="md" fontSize="md" ml="15px">{`${t('header.logout')}`}</Button></div> : <div><Link to='/signup'><Button colorScheme="teal" size="md" ml="15px">{`${t('header.register')}`}</Button></Link><Link to='/login'><Button colorScheme="teal" size="md" ml="15px">{`${t('header.signin')}`}</Button></Link></div>}

            </Flex>
        </nav >
    );
}

export default LandingNav;
