import React, { type FC, memo } from 'react';
import type { IPost } from '../../../models/IPost.ts';

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = memo(({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    console.log(event);
    const title = prompt() || '';
    update({ ...post, title });
  };

  return (
    <div className='post' onClick={handleUpdate}>
      {post.id}. {post.title}
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
});

export default PostItem;
