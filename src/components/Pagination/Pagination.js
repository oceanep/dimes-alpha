import { useState } from "react"
import {
    Flex,
    HStack,
    Circle,
    Icon
} from "@chakra-ui/react"
import { MdArrowForward, MdArrowBack } from 'react-icons/md'

const Pagination = ({ contactsPerPage, totalContacts, paginate, currentPage, mini}) => {


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

  const renderPageDots = () => {
    if (pageNumbers.length > 15) {
      const total = pageNumbers.length - 1
      let lowLimit = 20
      // let upLimit = 8
      const firstNumbers = pageNumbers.slice(0,lowLimit)
      const lastNumbers = pageNumbers.slice(total - lowLimit, total)
      const currentIndex = currentPage - 1
      // console.log(currentPage, upLimit)
      // if (currentPage > upLimit) {
      //   upLimit += (5 * )
      //   lowLimit = upLimit - 5
      //   console.log('low, up', lowLimit, upLimit)
      // } else if (currentPage < lowLimit && currentPage > 3 ){
      //   upLimit -= 5
      //   lowLimit = upLimit - 5
      //   console.log('low, up', lowLimit, upLimit)
      // }
      // const middleNumbers = pageNumbers.slice( lowLimit, upLimit)
      // console.log(middleNumbers)
      // {middleNumbers.map( (number) => (
      //   currentPage == number ?
      //     <a onClick={() => pagination(number)} key={number} >
      //       <Circle h='.5em' w='.5em' bgColor='blue.600' />
      //     </a>
      //   :
      //     <a onClick={() => pagination(number)} key={number} >
      //       <Circle h='.5em' w='.5em' border='1px' borderColor='blue.400'/>
      //     </a>
      // ))}

      return (
        <>
          {firstNumbers.map( (number) => (
            currentPage == number ?
              <a onClick={() => pagination(number)} key={number} >
                <Circle h='.5em' w='.5em' bgColor='blue.600' />
              </a>
            :
              <a onClick={() => pagination(number)} key={number} >
                <Circle h='.5em' w='.5em' border='1px' borderColor='blue.400'/>
              </a>
          ))}
          <p>...</p>
          {lastNumbers.map( (number) => (
            currentPage == number ?
              <a onClick={() => pagination(number)} key={number} >
                <Circle h='.5em' w='.5em' bgColor='blue.600' />
              </a>
            :
              <a onClick={() => pagination(number)} key={number} >
                <Circle h='.5em' w='.5em' border='1px' borderColor='blue.400'/>
              </a>
          ))}
        </>
      )
    } else {

      return (
        pageNumbers.map( number  => (
          currentPage == number ?
            <a onClick={() => pagination(number)} key={number} >
              <Circle h='.5em' w='.5em' bgColor='blue.600' />
            </a>
          :
            <a onClick={() => pagination(number)} key={number} >
              <Circle h='.5em' w='.5em' border='1px' borderColor='blue.400'/>
            </a>
        ))
      )

    }
  }

  return (
    <Flex h="4em" direction="row" justifyContent="space-around" align="center">
      <a onClick={prevPage} href='!#'>
        <Circle size='30px' shadow='md'  mx="15px">
          <Icon as={MdArrowBack}/>
        </Circle>
      </a>
      <HStack flexWrap="wrap" maxW="100%">
      {
        mini ? ''
        :
        renderPageDots()
      }
      </HStack>
      <a onClick={nextPage} href='!#'>
        <Circle size='30px' shadow='md'  mx="15px">
          <Icon as={MdArrowForward} />
        </Circle>
      </a>
    </Flex>
  )
}

Pagination.defaultProps = {
  mini: false
}

Pagination.displayName = "Pagination"
export default Pagination
