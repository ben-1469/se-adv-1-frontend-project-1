import React from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import { Post } from '../interfaces';
import MainLayout from '../layout/MainLayout';

type Props = {};

const GroupDetailPage = (props: Props) => {
  const currentlyLoggedInUserId = window.localStorage.getItem('userId');
  const location = useLocation();
  const groupId = location.pathname.split('/')[2];
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);

  const fetchData = async () => {
    const postResponse = await fetch(
      `http://localhost:4000/posts/group/${groupId}`,
    );
    const postData = await postResponse.json();

    setAllPosts(postData);
  };

  const handleDeletePost = async (postId: string) => {
    const response = await fetch(`http://localhost:4000/posts/${postId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout leftNav={<p>something</p>} rightNav={<p>authors</p>}>
      <PostList
        allPosts={allPosts}
        currentlyLoggedInUserId={currentlyLoggedInUserId}
        handleDeletePost={handleDeletePost}
      />
    </MainLayout>
  );
};

export default GroupDetailPage;
