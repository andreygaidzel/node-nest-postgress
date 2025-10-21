import PostModal from '@/components/features/posts/PostModal.tsx';
import { useDeletePostMutation, useFetchPostsQuery, useUpdatePostMutation } from '@/services/PostService.ts';
import { useCallback } from 'react';
import type { IPost } from '@/models/IPost.ts';
import CTable from '@/components/shared/table/Table.tsx';
import { PostsActions } from '@/store/reducers/PostSlice.ts';
import { POSTS_TABLE_MODEL } from '@/pages/posts-page/Posts.const.tsx';
import { useAppSelector } from '@/hooks/redux.ts';
import type { RootState } from '@/store/store.ts';

function PostsPage() {
  const [updatePost] = useUpdatePostMutation();
  const [deleteItem] = useDeletePostMutation();
  const postsSelector = useAppSelector((state: RootState) => state.posts);

  const handleRemove = useCallback((post: IPost) => {
    deleteItem(post);
  }, [deleteItem]);

  const handleUpdate = useCallback((post: IPost) => {
    updatePost(post);
  }, [updatePost]);

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>PostsPage</h1>
        <PostModal/>
      </div>

      <CTable<IPost>
        tableModel={POSTS_TABLE_MODEL}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
        sliceActions={PostsActions}
        useFetchQuery={useFetchPostsQuery}
        stateSelector={postsSelector}
      />
    </div>
  );
}

export default PostsPage;