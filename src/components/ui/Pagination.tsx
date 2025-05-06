import { FC, useState, useEffect } from 'react';
import CustomButton from './Button';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void; // Add callback for Load More button
  initialDisplayCount?: number;
  showLoadMore?: boolean;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onLoadMore,
  initialDisplayCount = 2,
  showLoadMore = true,
  className = '',
}) => {
  const [showingAll, setShowingAll] = useState(false);
  // const theme = useTheme();
  
  // Reset showingAll state when currentPage changes
  useEffect(() => {
    setShowingAll(false);
  }, [currentPage]);
  
  // Calculate total number of pages
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const handleLoadMore = () => {
    setShowingAll(true);
    // Call the parent component's onLoadMore if provided
    if (onLoadMore) {
      onLoadMore();
    }
  };
  
  // If there's only one page, don't render pagination
  if (totalPages <= 1 && !showLoadMore) {
    return null;
  }
  
  return (
    <div className={`mt-6 ${className} relative`} style={{ height: showLoadMore && !showingAll ? '50px' : '0px', transition: 'height 0.3s ease-in-out' }}>
      {/* Load More Button */}
      {showLoadMore && !showingAll && totalItems > initialDisplayCount && (
        <div className="text-center absolute w-full transition-opacity duration-300 ease-in-out opacity-100">
          <CustomButton
            variant="secondary"
            onClick={handleLoadMore}
            className="w-full sm:w-auto"
          >
            Voir plus
          </CustomButton>
        </div>
      )}
      
      {/* Page Navigation */}
      {(showingAll || !showLoadMore) && totalPages > 1 && (
        <nav className="flex justify-between items-center border-t border-secondary-200 pt-4 mt-4 transition-all duration-300 ease-in-out" aria-label="Pagination">
          <div className="flex-1 flex justify-between sm:justify-start">
            <CustomButton
              variant="secondary"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Précédent
            </CustomButton>
            <CustomButton
              variant="secondary"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Suivant
            </CustomButton>
          </div>
          
          <div className="hidden sm:flex gap-1">
            {pageNumbers.map((page) => (
              <CustomButton
                key={page}
                variant={page === currentPage ? 'primary' : 'secondary'}
                size="sm"
                className={`w-8 h-8 p-0 flex items-center justify-center ${
                  page === currentPage ? 'font-medium' : 'font-normal'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </CustomButton>
            ))}
          </div>
          
          <div className="flex-1 flex justify-end">
            <p className="text-sm text-secondary-700">
              Page <span className="font-medium">{currentPage}</span> sur{' '}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
