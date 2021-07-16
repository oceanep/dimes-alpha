import { useState, useCallback, useEffect } from 'react';

function usePages(initialState = true) {

  const [firstPage, setFirstPage] = useState(initialState)
  const [secondPage, setSecondPage] = useState(!initialState)
  const [thirdPage, setThirdPage] = useState(!initialState)
  const [fourthPage, setFourthPage] = useState(!initialState)

  const goFirstPage = useCallback(() => {
    setFirstPage(true)
    setSecondPage(false)
    setThirdPage(false)
    setFourthPage(false)
  }, [])

  const goSecondPage = useCallback(() => {
    setFirstPage(false)
    setSecondPage(true)
    setThirdPage(false)
    setFourthPage(false)
  }, [])

  const goThirdPage = useCallback(() => {
    setFirstPage(false)
    setSecondPage(false)
    setThirdPage(true)
    setFourthPage(false)
  }, [])

  const goFourthPage = useCallback(() => {
    setFirstPage(false)
    setSecondPage(false)
    setThirdPage(false)
    setFourthPage(true)
  }, [])

  return [firstPage, goFirstPage, secondPage, goSecondPage, thirdPage, goThirdPage, fourthPage, goFourthPage]
}

export default usePages;
