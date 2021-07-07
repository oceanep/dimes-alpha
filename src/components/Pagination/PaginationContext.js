import { useState, createContext } from 'react'

export const PaginationContext = createContext()

export const PaginationContextProvider = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([])

  const populateCurrentItems = (items, itemsPerPage) => {
    let indexOfLastPost = currentPage * itemsPerPage;
    let indexOfFirstPost = indexOfLastPost - itemsPerPage;
    let current = items.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentItems(current)
  }

  return (
    <PaginationContext.Provider value={[currentPage, setCurrentPage, currentItems, populateCurrentItems]}>
      {props.children}
    </PaginationContext.Provider>
  );
};
