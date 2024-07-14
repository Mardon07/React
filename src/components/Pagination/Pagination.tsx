import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.floor(totalItems / itemsPerPage);

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious10Pages = () => {
    if (currentPage > 10) {
      onPageChange(currentPage - 10);
    } else {
      onPageChange(1);
    }
  };

  const handleNext10Pages = () => {
    if (currentPage + 10 < totalPages) {
      onPageChange(currentPage + 10);
    } else {
      onPageChange(totalPages);
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handleFirstPage} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={handlePrevious10Pages} disabled={currentPage <= 10}>
        -10
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) =>
          (page <= 5 ||
            page > totalPages - 5 ||
            (page >= currentPage - 2 && page <= currentPage + 2)) && (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? styles.active : ''}
            >
              {page}
            </button>
          ),
      )}

      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <button
        onClick={handleNext10Pages}
        disabled={currentPage + 10 >= totalPages}
      >
        +10
      </button>
      <button onClick={handleLastPage} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
