import dayjs from 'dayjs';
import React from 'react';
import { User } from '../../interfaces';

type Props = {
  user: User;
};

const UserProfileInfo = ({ user }: Props) => {
  return (
    <div>
      <div className='pb-1 sm:pb-6'>
        <div className='sm:flex-1'>
          <div>
            <img
              className='w-40 mb-2 rounded-full shadow-lg'
              src={user.profilePic}
              alt=''
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
