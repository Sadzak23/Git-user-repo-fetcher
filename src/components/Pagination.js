import React from 'react';

export const Pagination = ({ getNewPage, currentPage, totalCount }) => {
  const onPageChange = (type) => {
    const page = type === 'next' ? currentPage + 1 : currentPage - 1
    getNewPage(page)
  }

  return (
    <div>
      {
        (totalCount > 30) &&
        <div className='pagination'>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange('previous')}
          >{'<'}
          </button>
          <p>Page {currentPage} of {Math.ceil(totalCount / 30)}</p>
          <button
            disabled={!(totalCount > (currentPage * 30))}
            onClick={() => onPageChange('next')}
          >{'>'}
          </button>
        </div>
      }
    </div>
  )
}