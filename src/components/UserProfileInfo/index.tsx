import axios from 'axios';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { User } from '../../interfaces';

type Props = {
  user: User;
};

const UserProfileInfo = ({ user }: Props) => {
  const inputFile = useRef(null);

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('userAvatar', file);
      formData.append('userId', user.id);
      const response = await axios.post(
        'http://localhost:4000/uploads/avatar',
        formData,
      );
      const fileLink = response.data.data;
      await axios.put('http://localhost:4000/users/' + user.id, {
        profilePic: fileLink,
      });
      if (response.data.success) {
        window.location.reload();
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      alert('Error uploading file');
    }
  };

  const onAvatarClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <div>
      <div className='pb-1 sm:pb-6'>
        <div className='sm:flex-1'>
          <div>
            <input
              type='file'
              id='file'
              ref={inputFile}
              style={{ display: 'none' }}
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <img
              className='w-40 h-40 mb-2 rounded-full shadow-lg hover:opacity-30 hover:cursor-pointer'
              src={user.profilePic}
              alt=''
              onClick={onAvatarClick}
            />

            <div className='flex items-center'>
              <h3 className='text-xl font-bold text-gray-900 sm:text-2xl'>
                {user.firstName} {user.lastName}
              </h3>
              <span className='ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400'>
                <span className='sr-only'>Online</span>
              </span>
            </div>
            <p className='text-sm text-gray-500'>@{user.username}</p>
          </div>
        </div>
      </div>
      <dl className='space-y-8 sm:space-y-6'>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Bio
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            <p>{user.bio}</p>
          </dd>
        </div>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Location
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            {user.location}
          </dd>
        </div>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Website
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            <a href={user.website}>{user.website}</a>
          </dd>
        </div>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Birthday
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            <time dateTime={user.dob}>
              {dayjs(user.dob).format('YYYY-MM-DD')}
            </time>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default UserProfileInfo;
