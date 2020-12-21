import React from 'react';

const PageNation = ({ totalPage, currentPage }) => {
  console.log('aaa');

  const output = [];
  const startIndex = 0;
  const endIndex = 5;

  for (let i = startIndex; i < endIndex; i += 1) {
    output.push(i);
  }

  console.log(output);
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {output.map((nationData) => (
          <>
            <li className="page-item">
              <a className="page-link" href="#">
                {nationData + 1}
              </a>
            </li>
          </>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PageNation;
