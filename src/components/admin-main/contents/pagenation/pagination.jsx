import { number } from 'prop-types';
import React from 'react';

function Pagenation({ totalPages, currentPage }) {
  console.log(totalPages);
  console.log(currentPage);

  const numberArray = [];

  const startNumber = 0;
  const endNumber = 5;

  const secondeArray = [];

  const secondPage = 6;
  const secondEndPagge = 10;

  for (let i = startNumber; i < endNumber; i += 1) {
    // console.log(i);
    numberArray.push(i);
  }
  for (let i = secondPage; i < secondEndPagge; i += 1) {
    secondeArray.push(i);
  }
  // console.log(numberArray);

  // for (let i = startNumber; i < endNumber; i += 1) {
  //   // console.log(i);
  //   numberArray(i);
  // }

  return (
    <nav aria-label="Page navigation example" className="d-flex">
      <ul className="pagination m-auto">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {numberArray.map((pageNumber) => (
          <li className="page-item">
            <a className="page-link" href="#">
              {pageNumber + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>

      <ul className="pagination m-auto">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {secondeArray.map((pageNumber) => (
          <li className="page-item">
            <a className="page-link" href="#">
              {pageNumber + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagenation;
