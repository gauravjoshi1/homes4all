import React from "react";

const Paginate = ({propertiesPerPage, totalProperties, paginate}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
      pageNumbers.push(i);
  }

  return(
      <nav className="mx-3">
          <ul className="pagination">
              {pageNumbers.map(pageNumber => (
                  <li key ={pageNumber} className="page-item my-2">
                    <a onClick={() => paginate(pageNumber)} href='#!' className="page-link">{pageNumber}</a>
                  </li>
              ))}
          </ul>
      </nav>
  );
};

export default Paginate;
