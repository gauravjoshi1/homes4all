import React from "react";

const Paginate = (props) => {
  const pageNumbers = [];
  const totalProperties = props.totalProperties;
  const propertiesPerPage = props.propertiesPerPage;
  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
      pageNumbers.push(i);
  }

  return(
      <nav class="mx-3">
          <ul className="pagination">
              {pageNumbers.map(pageNumber => (
                  <li key ={pageNumber} className="page-item my-2">
                    <a href="#!" className="page-link">{pageNumber}</a>
                  </li>
              ))}
          </ul>
      </nav>
  );
};

export default Paginate;
