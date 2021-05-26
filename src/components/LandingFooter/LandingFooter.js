import {
  Box,
  Flex,
  Button,
  Spacer,
  Text,
  Image
} from '@chakra-ui/react';
import {
  Link
} from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next'

const lngs = {
  en: { nativeName: 'English' },
  jp: { nativeName: '日本語' },
  cn: { nativeName: '中国語' }
}

function LandingFooter() {

  const { t, i18n } = useTranslation()

  return (
    <footer>
      <Flex mx={"60px"} py="4em" alignItems="center">
        <Box>
          <Image maxW="100px" src="https://dimes-frontend-assets.s3-ap-northeast-1.amazonaws.com/img/dimes_logo_2.png" alt="Dimes Logo"/>
        </Box>
        <Text ml="15px" fontSize="xs"><a href="" target="_blank">{`${t('description.privacy')}`}</a> | <a href="" target="_blank">{`${t('description.terms')}`}</a></Text>
        <Spacer/>
        {Object.keys(lngs).map((lng) => (
          <Button 
              key={lng} 
              // style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} 
              type="submit" 
              onClick={() => i18n.changeLanguage(lng)}
              colorScheme="gray" 
              size="xs" 
              ml="15px"
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
        <Text fontSize="xs" ml="15px">&#169;&nbsp;2021 {`${t('description.dimesInc')}`}</Text>
      </Flex>
    </footer>
  );
}

export default LandingFooter;
