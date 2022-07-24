import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, User } from '../interfaces';
import UsersList from '../components/UsersList';
import LandingTabs from '../components/LandingTabs';
import PostList from '../components/PostList';
import Sidenav from '../components/Sidenav';
import MainLayout from '../layout/MainLayout';
import PostListPanel from '../components/PostListPanel';

function LandingPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const currentlyLoggedInUserId = window.localStorage.getItem('userId');

  const fetchData = async () => {
    const postResponse = await fetch('http://localhost:4000/posts');
    const userResponse = await fetch('http://localhost:4000/users');
    const postData = await postResponse.json();
    const userData = await userResponse.json();
    setAllUsers(userData);
    setAllPosts(postData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      leftNav={<Sidenav />}
      rightNav={
        <div className='space-y-4'>
          <UsersList title='Who to friend' users={allUsers} />
          <PostListPanel />
        </div>
      }
    >
      <LandingTabs />
      <PostList
        allPosts={allPosts}
        currentlyLoggedInUserId={currentlyLoggedInUserId}
        handleDeletePost={handleDeletePost}
      />
    </MainLayout>
  );
}

export default LandingPage;
