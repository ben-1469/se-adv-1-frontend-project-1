import React from 'react';
import { useLocation } from 'react-router-dom';
import UserProfileInfo from '../components/UserProfileInfo';
import UsersList from '../components/UsersList';
import { User } from '../interfaces';
import MainLayout from '../layout/MainLayout';

function UserDetailPage({}) {
  const [friends, setFriends] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const fetchData = React.useCallback(async () => {
    const friendsResponse = await fetch(
      `http://localhost:4000/users/${userId}/friends`,
    );
    const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
    const friendsData = await friendsResponse.json();
    const userData = await userResponse.json();
    setFriends(friendsData);
    setUser(userData);
  }, [userId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(friends);
  return (
    <MainLayout
      leftNav={user && <UserProfileInfo user={user} />}
      rightNav={<UsersList users={friends} title='Friends' />}
    >
      <h1>This is my posts</h1>
    </MainLayout>
  );
}

export default UserDetailPage;
