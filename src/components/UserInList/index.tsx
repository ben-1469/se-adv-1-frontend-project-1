import { PlusSmIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_PICTURE } from '../../constants';
import { User } from '../../interfaces';

type Props = {
  user: User;
};

const UserInList = ({ user }: Props) => {
  const currentlyLoggedInUserId = window.localStorage.getItem('userId');
  const sendFriendRequest = async () => {
    const response = await axios.post(
      'http://localhost:4000/users/friends/request',
      {
        userId: currentlyLoggedInUserId,
        friendId: user.id,
      }
    );
    if (response.data.success) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    const checkIfFriends = async () => {
      const response = await axios.post(
        `http://localhost:4000/users/friends/lookup`,
        {
          userId: currentlyLoggedInUserId,
          friendId: user.id,
        }
      );
      console.log(response);
    };
    checkIfFriends();
  }, []);
  return (
    <li key={user.id} className='flex items-center py-4 space-x-3'>
      <div className='flex-shrink-0'>
        <img
          className='w-8 h-8 rounded-full'
          src={user?.profilePic || DEFAULT_PROFILE_PICTURE}
          alt=''
        />
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-gray-900'>
          <Link to={`/user/${user.id}`}>
            {user.firstName} {user.lastName}
          </Link>
        </p>
        <p className='text-sm text-gray-500'>
          <Link to={`/user/${user.id}`}>{'@' + user.username}</Link>
        </p>
      </div>
      <div className='flex-shrink-0'>
        <button
          type='button'
          onClick={() => sendFriendRequest()}
          className='inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100'
        >
          <PlusSmIcon
            className='-ml-1 mr-0.5 h-5 w-5 text-rose-400'
            aria-hidden='true'
          />
          <span>Friend</span>
        </button>
      </div>
    </li>
  );
};

export default UserInList;
