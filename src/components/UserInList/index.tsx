import { CheckIcon, PlusSmIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_PICTURE, FRIEND_STATUS_MAP } from '../../constants';
import { User } from '../../interfaces';

type Props = {
  user: User;
};

const UserInList = ({ user }: Props) => {
  const currentlyLoggedInUserId = window.localStorage.getItem('userId');
  const [friendStatus, setFriendStatus] = useState(
    FRIEND_STATUS_MAP.NON_FRIEND
  );
  const [friendAt, setFriendAt] = useState('');

  const checkIfFriends = async () => {
    const response = await axios.post(
      `http://localhost:4000/users/friends/lookup`,
      {
        userId: currentlyLoggedInUserId,
        friendId: user.id,
      }
    );
    if (response.data.status) {
      setFriendStatus(response.data.status);
      setFriendAt(response.data.friendAt);
    }
  };

  const sendFriendRequest = async () => {
    const response = await axios.post(
      'http://localhost:4000/users/friends/request',
      {
        userId: currentlyLoggedInUserId,
        friendId: user.id,
      }
    );
    if (response.data.success) {
      checkIfFriends();
    }
  };

  useEffect(() => {
    checkIfFriends();
  }, []);

  const cancelFriendRequest = async () => {
    const response = await axios.delete(
      'http://localhost:4000/users/friends/request',
      {
        data: {
          userId: currentlyLoggedInUserId,
          friendId: user.id,
        },
      }
    );
    if (response.data.success) {
      checkIfFriends();
    }
  };

  const approveRequest = async () => {
    const response = await axios.put(
      'http://localhost:4000/users/friends/approve',
      {
        userId: currentlyLoggedInUserId,
        friendId: user.id,
      }
    );
    if (response.data.success) {
      checkIfFriends();
    }
  };

  const renderButton = () => {
    switch (friendStatus) {
      case FRIEND_STATUS_MAP.NON_FRIEND:
        return (
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
        );
      case FRIEND_STATUS_MAP.PENDING:
        return (
          <div className='space-x-2'>
            <button
              type='button'
              onClick={() => approveRequest()}
              className='inline-flex items-center px-3 py-0.5 rounded-full bg-green-50 text-sm font-medium text-green-700 hover:bg-green-100'
            >
              <CheckIcon
                className='-ml-1 mr-0.5 h-5 w-5 text-green-400'
                aria-hidden='true'
              />
              <span>Approve</span>
            </button>
            <button
              type='button'
              onClick={() => cancelFriendRequest()}
              className='inline-flex items-center px-3 py-0.5 rounded-full bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100'
            >
              <XIcon
                className='-ml-1 mr-0.5 h-5 w-5 text-red-400'
                aria-hidden='true'
              />
              <span>Reject</span>
            </button>
          </div>
        );
      case FRIEND_STATUS_MAP.SENT:
        return (
          <button
            type='button'
            onClick={() => cancelFriendRequest()}
            className='inline-flex items-center px-3 py-0.5 rounded-full bg-orange-50 text-sm font-medium text-orange-700 hover:bg-orange-100'
          >
            <XIcon
              className='-ml-1 mr-0.5 h-5 w-5 text-orange-400'
              aria-hidden='true'
            />
            <span>Request</span>
          </button>
        );
      case FRIEND_STATUS_MAP.FRIEND:
        return <span>Friends Since {dayjs(friendAt).fromNow()}</span>;
      default:
        return <p>error</p>;
    }
  };

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
      <div className='flex-shrink-0'>{renderButton()}</div>
    </li>
  );
};

export default UserInList;
