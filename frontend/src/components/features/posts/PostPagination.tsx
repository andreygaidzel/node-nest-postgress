import { memo } from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const PostPagination = memo(({ page, totalPages, onPrev, onNext }: PaginationProps) => {
  console.log('Pagination render');
  return (
    <div className='navigation'>
      <button onClick={onPrev} disabled={page === 1}>
        prev
      </button>
      {page}
      <button onClick={onNext} disabled={page === totalPages}>
        next
      </button>
    </div>
  );
});

export default PostPagination;
