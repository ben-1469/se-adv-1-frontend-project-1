import React from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import UserProfileInfo from '../components/UserProfileInfo';
import UsersList from '../components/UsersList';
import { Post, User } from '../interfaces';
import MainLayout from '../layout/MainLayout';

function UserDetailPage({}) {
  const [friends, setFriends] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const currentlyLoggedInUserId = window.localStorage.getItem('userId');

  const fetchData = React.useCallback(async () => {
    const friendsResponse = await fetch(
      `http://localhost:4000/users/${userId}/friends`,
    );
    const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
    const postResponse = await fetch(`http://localhost:4000/posts/${userId}`);
    const friendsData = await friendsResponse.json();
    const userData = await userResponse.json();
    const postData = await postResponse.json();
    setFriends(friendsData);
    setUser(userData);
    setPosts(postData);
  }, [userId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePost = async (postId: string) => {
    const response = await fetch(`http://localhost:4000/posts/${postId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    fetchData();
  };

  return (
    <MainLayout
      leftNav={user && <UserProfileInfo user={user} />}
      rightNav={<UsersList users={friends} title='Friends' />}
    >
      <PostList
        allPosts={posts}
        currentlyLoggedInUserId={currentlyLoggedInUserId}
        handleDeletePost={handleDeletePost}
      />
    </MainLayout>
  );
}

export default UserDetailPage;
