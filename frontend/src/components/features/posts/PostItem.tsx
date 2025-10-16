import React, { type FC, memo } from 'react';
import type { IPost } from '@/models/IPost.ts';
import { Box, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { baseUrl, viewDateFormat } from '@/shared/constants/baseConfig.ts';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = memo(({ post, remove }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };

  const formatDate = (date: string) => date && dayjs(date).format(viewDateFormat);

  // const handleUpdate = (event: React.MouseEvent) => {
  //   console.log(event);
  //   const title = prompt() || '';
  //   update({ ...post, title });
  // };

  return (
    <TableRow
      key={post.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Box
          component="img"
          src={`${baseUrl}/${post.image}`}
          alt={post.image}
          sx={{
            width: 90,
            height: 90,
            borderRadius: 2,
            objectFit: 'cover',
            boxShadow: 1,
          }}
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: "default", maxWidth: '200px' }}>
        <Tooltip title={post.title}>
          <span>{post.title}</span>
        </Tooltip>
      </TableCell>
      <TableCell>{post.content}</TableCell>
      <TableCell align="center" sx={{ whiteSpace: 'nowrap'}}>
        {formatDate(post.createdAt)}
      </TableCell>
      <TableCell align="center" sx={{ whiteSpace: 'nowrap'}}>
        {formatDate(post.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleRemove}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

export default PostItem;
