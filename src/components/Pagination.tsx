import React, { useState } from "react";
import ProTypes from "prop-types";

Pagination.propTypes = {
  pagination: ProTypes.object.isRequired,
  onPageChange: ProTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props: any) {
  const { pagination, onPageChange } = props;
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <button
        disabled={_page === 1}
        onClick={() => handlePageChange(_page - 1)}
      >
        Prev
      </button>

      <button
        disabled={_page >= totalPages}
        onClick={() => handlePageChange(_page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
