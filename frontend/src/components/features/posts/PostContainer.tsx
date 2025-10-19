import { useState } from 'react';
import {
  useDeletePostMutation,
  useFetchPostsQuery,
  useUpdatePostMutation,
} from '@/services/PostService.ts';
import type { IPost } from '@/models/IPost.ts';
import * as React from 'react';
import type { ITableView } from '@/components/shared/table/TableView.model.ts';
import CTable from '@/components/shared/table/Table.tsx';
import { baseUrl } from '@/shared/constants/baseConfig.ts';
import { Box, Tooltip } from '@mui/material';

const tableModel: ITableView = {
  columns: [
    {
      columnKey: 'image',
      header: 'Image',
      templateFn: (column, item) => (
        <Box
          component="img"
          src={`${baseUrl}/${item[column.columnKey]}`}
          alt={item[column.columnKey]}
          sx={{
            width: 90,
            height: 90,
            borderRadius: 2,
            objectFit: 'cover',
            boxShadow: 1,
          }}
        />
      )
    },
    {
      columnKey: 'title',
      header: 'Title',
      isSort: true,
      isFilter: true,
      type: 'text',
      sx: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: "default", maxWidth: '200px' },
      templateFn: (column, item) => (
        <Tooltip title={item[column.columnKey]}>
          <span>{item[column.columnKey]}</span>
        </Tooltip>
      )
    },
    {
      columnKey: 'content',
      header: 'Content',
      isSort: true,
      isFilter: true,
      type: 'text',
    },
    {
      columnKey: 'createdAt',
      header: 'Created At',
      align: 'center',
      isSort: true,
      isFilter: true,
      type: 'date',
      sx: { whiteSpace: 'nowrap'}
    },
    {
      columnKey: 'updatedAt',
      header: 'Updated At',
      align: 'center',
      isSort: true,
      isFilter: true,
      type: 'date',
      sx: { whiteSpace: 'nowrap'}
    }
  ]
};

const PostContainer: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<string>('title.asc');
  const { data, error, isLoading } = useFetchPostsQuery({ limit, page, sort, filter });
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: rows, pageSize, totalItems } = data || {};

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    console.log(filters);
    setFilter(filters);
    setPage(1);
  };

  return (
    <>
      <CTable<IPost>
        tableModel={tableModel}
        error={error && JSON.stringify(error)}
        isLoading={isLoading}
        rows={rows}
        limit={limit}
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
        setLimit={setLimit}
        setPage={setPage}
        sort={sort}
        filter={filter}
        setSort={setSort}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

export default PostContainer;
