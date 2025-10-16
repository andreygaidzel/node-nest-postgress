import { useState } from 'react';
import {
  useDeletePostMutation,
  useFetchPostsQuery,
  useUpdatePostMutation,
} from '@/services/PostService.ts';
import PostItem from './PostItem.tsx';
import type { IPost } from '@/models/IPost.ts';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import * as React from 'react';

const rowsPerPageOptions = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  }
];

const PostContainer = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useFetchPostsQuery({ limit, page });
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: rows,  pageSize, totalItems } = data || {};

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setPage(page + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setLimit(newPageSize);
    setPage(1);
  };

  return (
    <div>
      <div className='post__list'>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Some error</h1>}
        {rows &&
          <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 220px)', mb: 2 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell align="center">Created At</TableCell>
                  <TableCell align="center">Updated At</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((post: IPost) => (
                  <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
      </div>
      <TablePagination
        component="div"
        count={totalItems}
        page={page - 1}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize || limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default PostContainer;
