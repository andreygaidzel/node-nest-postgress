import PostContainer from '@/components/features/posts/PostContainer.tsx';
import PostModal from '@/components/features/posts/PostModal.tsx';

function PostsPage() {
  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>PostsPage</h1>
        <PostModal />
      </div>
      <PostContainer />
    </div>
  );
}

export default PostsPage;