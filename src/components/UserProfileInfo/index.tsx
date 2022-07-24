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
            <p>
              Enim feugiat ut ipsum, neque ut. Tristique mi id elementum
              praesent. Gravida in tempus feugiat netus enim aliquet a, quam
              scelerisque. Dictumst in convallis nec in bibendum aenean arcu.
            </p>
          </dd>
        </div>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Location
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            New York, NY, USA
          </dd>
        </div>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Website
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            ashleyporter.com
          </dd>
        </div>
        <div>
          <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
            Birthday
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
            <time dateTime='1988-06-23'> June 23, 1988 </time>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default UserProfileInfo;
