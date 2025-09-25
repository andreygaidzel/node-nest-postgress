import { useCallback, useState } from 'react';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useFetchPostsQuery,
  useUpdatePostMutation,
} from '../../../services/PostService.ts';
import PostItem from './PostItem.tsx';
import type { IPost } from '../../../models/IPost.ts';
import PostPagination from './PostPagination.tsx';

const PostContainer = () => {
  const [limit] = useState(100);
  const [page, setPage] = useState(1);
  const { data: posts, error, isLoading } = useFetchPostsQuery({ limit, page });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const totalPages = 5;

  console.log('PostContainer render');

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, []);

  return (
    <div>
      <div className='post__list'>
        <button onClick={handleCreate}>Add new post</button>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {posts &&
          posts.map((post: IPost) => (
            <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
          ))}
      </div>
      <PostPagination page={page} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

export default PostContainer;
