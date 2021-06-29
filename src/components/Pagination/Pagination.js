import { useState } from "react"
import {
    Flex,
    HStack,
    Circle,
    Icon
} from "@chakra-ui/react"
import { MdArrowForward, MdArrowBack } from 'react-icons/md'

const Pagination = ({ contactsPerPage, totalContacts, paginate, currentPage}) => {


  const [lastPage, deactivateLastPage] = useState(false)
  const [firstPage, deactivateFirstPage] = useState(true)
  const pageNumbers = []

  for (let i = 1; i<= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagination = (number) => {
    paginate(number)
  }

  const nextPage = (e) => {
    e.preventDefault()
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1)
    }
  }

  const prevPage = (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      paginate(currentPage - 1)
    }
  }

  return (
    <Flex h="4em" direction="row" justifyContent="space-around" align="center">
      <a onClick={prevPage} href='!#'>
        <Circle size='40px' shadow='md'  mx="15px">
          <Icon as={MdArrowBack}/>
        </Circle>
      </a>
      <HStack>
      {
        pageNumbers.map((number,index) => (
          currentPage == (index+1) ?
            <a onClick={() => pagination(number)} >
              <Circle h='1em' w='1em' bgColor='blue.600' />
            </a>
          :
            <a onClick={() => pagination(number)} >
              <Circle h='1em' w='1em' border='1px' borderColor='blue.400'/>
            </a>
        ))
      }
      </HStack>
      <a onClick={nextPage} href='!#'>
        <Circle size='40px' shadow='md'  mx="15px">
          <Icon as={MdArrowForward} />
        </Circle>
      </a>
    </Flex>
  )
}

export default Pagination
