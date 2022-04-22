import React, { useState } from 'react'
import Link from 'next/link'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

function Pagination({
  pages,
  pageLimit = 5,
  dataLimit = 30,
  currentPage = 1,
  numberOfPages,
}) {
  //const [currentPage, setCurrentPage] = useState(1)

  function goToPreviousPage() {
    if (currentPage > 1) {
      return `/client/pages/page_${parseInt(currentPage) - 1}`
    } else return `/client/pages/page_${currentPage}`
  }

  function goToNextPage() {
    if (currentPage < numberOfPages) {
      return `/client/pages/page_${parseInt(currentPage) + 1}`
    } else return `/client/pages/page_${currentPage}`
  }

  function lastPage(event) {
    return `/client/pages/page_${numberOfPages}`
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    //return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
    return pages.slice(start, start + pageLimit + 1)
  }

  return (
    <div className="text-yellow z-20 mx-auto mt-6 flex items-center">
      <Link href={'/client/pages/page_1'} passHref>
        <a className="mx-4 rotate-180 font-bold" title="First page">
          <LastPageIcon />
        </a>
      </Link>
      <Link href={goToPreviousPage()} passHref>
        <a className="mx-4 font-bold" title="Previous page">
          <KeyboardArrowLeftIcon />
        </a>
      </Link>

      {getPaginationGroup().map((page, index) =>
        page.value == currentPage ? (
          <Link href={page.page} key={page.page} scroll passHref>
            <a className="mx-1 rounded border border-cyan-400 p-2 font-bold text-cyan-600">
              {page.value}
            </a>
          </Link>
        ) : (
          <Link href={page.page} key={page.page} scroll passHref>
            <a className="mx-1 p-2">{page.value}</a>
          </Link>
        )
      )}
      <Link href={goToNextPage()} passHref>
        <a className="mx-4 font-bold" title="Next page">
          <KeyboardArrowRightIcon />
        </a>
      </Link>
      <Link href={lastPage()} passHref>
        <a className="mx-4" title="Last page">
          <LastPageIcon />
        </a>
      </Link>
    </div>
  )
}
export default Pagination
