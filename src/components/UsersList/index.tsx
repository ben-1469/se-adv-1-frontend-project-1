import { ChatAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces';
import UserInList from '../UserInList';

type Props = {
  users: User[];
  title: string;
  viewAllLink?: string;
};

const UsersList = ({ users, title, viewAllLink }: Props) => {
  return (
    <div className='space-y-4 top-4'>
      <section aria-labelledby='who-to-follow-heading'>
        <div className='bg-white rounded-lg shadow'>
          <div className='p-6'>
            <h2
              id='who-to-follow-heading'
              className='text-base font-medium text-gray-900'
            >
              {title}
            </h2>
            <div className='flow-root mt-6'>
              <ul className='-my-4 divide-y divide-gray-200'>
                {users.map((user, index) => (
                  <UserInList key={index} user={user} />
                ))}
              </ul>
            </div>
            {viewAllLink && (
              <div className='mt-6'>
                <Link
                  to={viewAllLink}
                  className='block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                >
                  View all
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsersList;
