import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupList from '../components/GroupList';
import PostList from '../components/PostList';
import Sidenav from '../components/Sidenav';
import UsersList from '../components/UsersList';
import { Group, Post, User } from '../interfaces';
import MainLayout from '../layout/MainLayout';

type Props = {};

const GroupDetailPage = (props: Props) => {
  const currentlyLoggedInUserId = window.localStorage.getItem('userId');
  const location = useLocation();
  const groupId = location.pathname.split('/')[2];
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const [allAuthors, setAllAuthors] = React.useState<User[]>([]);
  const [allGroups, setAllGroups] = React.useState<Group[]>([]);

  const fetchData = async () => {
    const postResponse = await fetch(
      `http://localhost:4000/posts/group/${groupId}`,
    );
    const authorsResponse = await fetch(
      `http://localhost:4000/users/group/${groupId}`,
    );
    const groupResponse = await fetch('http://localhost:4000/groups');
    const groupData = await groupResponse.json();
    const postData = await postResponse.json();
    const authorData = await authorsResponse.json();

    setAllPosts(postData);
    setAllAuthors(authorData);
    setAllGroups(groupData);
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
    <MainLayout
      leftNav={
        <div className='divide-y divide-gray-300'>
          <Sidenav />
          <GroupList groups={allGroups} />
        </div>
      }
      rightNav={<UsersList title='Group Authors' users={allAuthors} />}
    >
      <PostList
        allPosts={allPosts}
        currentlyLoggedInUserId={currentlyLoggedInUserId}
        handleDeletePost={handleDeletePost}
      />
    </MainLayout>
  );
};

export default GroupDetailPage;
