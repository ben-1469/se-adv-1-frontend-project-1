import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';
import GroupList from '../components/GroupList';
import Sidenav from '../components/Sidenav';
import UserInfoPanel from '../components/UserInfoPanel';
import UserProfileInfo from '../components/UserProfileInfo';
import { Group, Post, User } from '../interfaces';
import MainLayout from '../layout/MainLayout';

function PostDetailPage({}) {
  const [post, setPost] = React.useState<Post>(null);
  const [user, setUser] = React.useState<User>(null);
  const [allGroups, setAllGroups] = React.useState<Group[]>([]);
  const fetchData = async () => {
    const postResponse = await fetch(`http://localhost:4000/posts/post/${id}`);
    const groupResponse = await fetch('http://localhost:4000/groups');

    const groupData = await groupResponse.json();
    const postData = await postResponse.json();
    setPost(postData);
    setAllGroups(groupData);
  };

  const fetchUser = async (userId: number) => {
    const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
    const userData = await userResponse.json();
    setUser(userData);
  };

  React.useEffect(() => {
    if (post) {
      fetchUser(post.userId);
    }
  }, [post]);

  React.useEffect(() => {
    fetchData();
  }, []);

  // grab the id for the post using useParam
  const { id } = useParams();

  // useEffect + useState to grab the post details from the backend to your state?

  return (
    <MainLayout
      leftNav={
        <div className='divide-y divide-gray-300'>
          <Sidenav />
          <GroupList groups={allGroups} />
        </div>
      }
      rightNav={user && <UserProfileInfo user={user} />}
    >
      {post && (
        <div>
          <h1 className='mb-2 text-3xl font-semibold'>{post.title}</h1>
          <span className='text-sm text-gray-500'>
            {dayjs(post.createdAt).format('MMM DD, YYYY')}
          </span>
          <p>{post.content}</p>
          <div>
            {post.comments &&
              post.comments.length &&
              post.comments.map((comment) => (
                <div>
                  <p>{comment}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default PostDetailPage;
