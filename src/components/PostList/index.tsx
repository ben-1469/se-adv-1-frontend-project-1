import { Post } from '../../interfaces';
import PostInList from '../PostInList';

type Props = {
  allPosts: Post[];
  currentlyLoggedInUserId: string;
  handleDeletePost: (postId: string) => void;
};

const PostList = ({
  allPosts,
  currentlyLoggedInUserId,
  handleDeletePost,
}: Props) => {
  return (
    <div className='mt-4'>
      <h1 className='sr-only'>Recent questions</h1>
      <ul role='list' className='space-y-4'>
        {allPosts.map((post, index) => (
          <PostInList
            post={post}
            key={index}
            currentlyLoggedInUserId={currentlyLoggedInUserId}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
