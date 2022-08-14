import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../helpers';

type Props = {
  type?: 'user' | 'post' | 'group';
};

const NotFoundPage = ({ type }: Props) => {
  return (
    <div className='min-h-full px-4 py-16 bg-transparent sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
      <div className='w-full mx-auto md:max-w-max'>
        <main className='sm:flex'>
          <p className='text-4xl font-extrabold text-red-600 sm:text-5xl'>
            404
          </p>
          <div className='sm:ml-6'>
            <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl'>
                {capitalize(type) || 'Page'} not found
              </h1>
              <p className='mt-1 text-base text-gray-500'>
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className='flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
              <Link
                to='/'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                Go back home
              </Link>
              <Link
                to='/'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                Contact support
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
