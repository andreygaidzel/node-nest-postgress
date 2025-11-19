import PostModal from '@/components/features/posts/PostModal.tsx';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useFetchPostsQuery,
  useUpdatePostMutation
} from '@/services/PostService.ts';
import type { IPost } from '@/models/IPost.ts';
import Table from '@/components/shared/table/Table.tsx';
import { PostsActions } from '@/store/reducers/PostSlice.ts';
import { POSTS_TABLE_MODEL } from '@/pages/posts-page/Posts.const.tsx';
import { useAppSelector } from '@/hooks/redux.ts';
import type { RootState } from '@/store/store.ts';
import { useTableFetch } from '@/hooks/table.ts';
import { useState } from 'react';
import { Button } from '@mui/material';

function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePost] = useUpdatePostMutation();
  const [deleteItem] = useDeletePostMutation();
  const [createPost] = useCreatePostMutation();
  const postsSelector = useAppSelector((state: RootState) => state.posts);

  const { actions, fetchResult, state } = useTableFetch<IPost>(postsSelector, useFetchPostsQuery, PostsActions);

  const handleAddPost = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleEditPost = (post: IPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  }

  const handleSubmit = async (formData: FormData, id?: number) => {
    if (id) {
      await updatePost({ id, formData });
    } else {
      await createPost(formData);
    }
    handleClose();
  };

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>PostsPage</h1>
        <Button variant='contained' onClick={handleAddPost}>
          Add New Post
        </Button>
      </div>

      <div className='simple-page__content'>
        <Table<IPost>
          tableModel={POSTS_TABLE_MODEL}
          removeAction={deleteItem}
          editAction={handleEditPost}
          actions={actions}
          fetchResult={fetchResult}
          state={state}
        />
      </div>

      <PostModal
        open={isModalOpen}
        post={selectedPost}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default PostsPage;