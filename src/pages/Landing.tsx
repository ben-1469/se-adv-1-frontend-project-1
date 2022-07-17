import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, User } from '../interfaces';
import WhoToFriend from '../components/WhoToFriend';
import LandingTabs from '../components/LandingTabs';
import PostList from '../components/PostList';
import Sidenav from '../components/Sidenav';
import Topnav from '../components/Topnav';

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
    <div className='min-h-screen bg-gray-50'>
      <div className='min-h-full'>
        <Topnav />
        <div className='py-10'>
          <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
            <div className='hidden lg:block lg:col-span-3 xl:col-span-2'>
              <Sidenav />
            </div>
            <main className='lg:col-span-9 xl:col-span-6'>
              <LandingTabs />
              <PostList
                allPosts={allPosts}
                currentlyLoggedInUserId={currentlyLoggedInUserId}
                handleDeletePost={handleDeletePost}
              />
            </main>
            <aside className='hidden xl:block xl:col-span-4'>
              <WhoToFriend allUsers={allUsers} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
