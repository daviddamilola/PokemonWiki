import React from "react";

function Pagination(props) {
  const {pagination, handlePrevPageClick, handleNextPageClick} = props;
  return <div className=" mt-4 flex justify-center items-center">
    <button
      disabled={!pagination.previousPage}
      onClick={handlePrevPageClick}
      className="pagination__btn"
    >
      {"<"}
    </button>
    <span className="ml-2"> Page </span>
    <span className="ml-2"> {pagination.currentPage} </span>
    <span className="ml-2"> Of </span>
    <span className="ml-2"> {pagination.totalPages} </span>
    <button
      disabled={!pagination.nextPage}
      onClick={handleNextPageClick}
      className="pagination__btn ml-2"
    >
      {">"}
    </button>
  </div>;
}

export default Pagination;
