import PostModal from '@/components/features/posts/PostModal.tsx';
import { useDeletePostMutation, useFetchPostsQuery, useUpdatePostMutation } from '@/services/PostService.ts';
import type { IPost } from '@/models/IPost.ts';
import Table from '@/components/shared/table/Table.tsx';
import { PostsActions } from '@/store/reducers/PostSlice.ts';
import { POSTS_TABLE_MODEL } from '@/pages/posts-page/Posts.const.tsx';
import { useAppSelector } from '@/hooks/redux.ts';
import type { RootState } from '@/store/store.ts';

function PostsPage() {
  const [updatePost] = useUpdatePostMutation();
  const [deleteItem] = useDeletePostMutation();
  const postsSelector = useAppSelector((state: RootState) => state.posts);

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>PostsPage</h1>
        <PostModal/>
      </div>

      <Table<IPost>
        tableModel={POSTS_TABLE_MODEL}
        handleRemove={deleteItem}
        handleUpdate={updatePost}
        sliceActions={PostsActions}
        useFetchQuery={useFetchPostsQuery}
        stateSelector={postsSelector}
      />
    </div>
  );
}

export default PostsPage;