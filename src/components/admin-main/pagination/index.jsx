import React from 'react';
import PropTypes from 'prop-types';

const PaginationPrevious = () => (
  <li className="page-item">
    <a className="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
);

const PaginationNext = () => (
  <li className="page-item">
    <a className="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
);

const PaginationNumber = ({ pageIndex, currentPage }) => (
  <li className={`page-item ${currentPage === pageIndex ? 'active' : ''}`}>
    <a className="page-link" href="#">
      {pageIndex}
    </a>
  </li>
);

PaginationNumber.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

const Pagination = ({ totalPage, currentPage, rangePage = 5 }) => {
  const newArray = [];
  const startPage = currentPage > 0 ? currentPage : 1;
  const startIndex = Math.floor((startPage - 1) / rangePage) * rangePage;
  const endIndex = startIndex + rangePage > totalPage ? totalPage : startIndex + rangePage;
  for (let i = startIndex; i < endIndex; i += 1) {
    newArray.push(i + 1);
  }

  return (
    <nav aria-label="Page navigation example " className="d-flex">
      <ul className="pagination m-auto">
        <PaginationPrevious />
        {newArray.map((value, index) => (
          <PaginationNumber pageIndex={value} key={`page-${index + 1}`} currentPage={currentPage} />
        ))}
        <PaginationNext />
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  rangePage: PropTypes.number
};

Pagination.defaultProps = {
  rangePage: 5
};

export default Pagination;
