import { Post } from '../../interfaces';
import EmptyState from '../EmptyState';
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
    <div>
      {allPosts.length ? (
        <ul className='space-y-4'>
          {allPosts.map((post, index) => (
            <PostInList
              post={post}
              key={index}
              currentlyLoggedInUserId={currentlyLoggedInUserId}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </ul>
      ) : (
        <EmptyState title='No posts found' subtitle='Please check back later' />
      )}
    </div>
  );
};

export default PostList;
