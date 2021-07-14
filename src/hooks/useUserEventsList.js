import { useState, useCallback, useEffect } from 'react';

function useUserEventsList(initialState = true) {

  const [firstPage, setFirstPage] = useState(initialState)
  const [secondPage, setSecondPage] = useState(!initialState)
  const [thirdPage, setThirdPage] = useState(!initialState)

  const goFirstPage = useCallback(() => {
    setFirstPage(true)
    setSecondPage(false)
    setThirdPage(false)
  }, [])

  const goSecondPage = useCallback(() => {
    setFirstPage(false)
    setSecondPage(true)
    setThirdPage(false)
    console.log('going to second page...')
  }, [])

  const goThirdPage = useCallback(() => {
    setFirstPage(false)
    setSecondPage(false)
    setThirdPage(true)
  }, [])

  return [firstPage, goFirstPage, secondPage, goSecondPage, thirdPage, goThirdPage]
}

export default useUserEventsList;
