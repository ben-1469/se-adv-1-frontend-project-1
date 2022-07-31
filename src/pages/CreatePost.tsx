import React from 'react';
import SingleDropdown from '../components/SingleDropdown';
import { Group } from '../interfaces';
import MainLayout from '../layout/MainLayout';

type Props = {};

const CreatePostPage = (props: Props) => {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const fetchData = async () => {
    const groupResponse = await fetch('http://localhost:4000/groups');
    const groupData = await groupResponse.json();
    setGroups(groupData);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <MainLayout>
      <form className='space-y-6' action='#' method='POST'>
        <div className='px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Create Post
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Fill in the information you want to share.
              </p>
            </div>
            <div className='mt-5 space-y-6 md:mt-0 md:col-span-2'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='The title of your post'
                  autoComplete='title'
                  className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>

              <div>
                <label
                  htmlFor='about'
                  className='block text-sm font-medium text-gray-700'
                >
                  Content
                </label>
                <div className='mt-1'>
                  <textarea
                    id='content'
                    name='content'
                    rows={5}
                    className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                    placeholder='I have something to say...'
                    defaultValue={''}
                  />
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                  The actual content for your post{' '}
                </p>
              </div>
              <div>
                <SingleDropdown
                  label='Group'
                  onSelect={(value) => {
                    console.log(value);
                  }}
                  options={groups.map((group) => ({
                    id: group.id.toString(),
                    name: group.name,
                  }))}
                  placeholder='Find a group this post belongs in'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          >
            Save
          </button>
        </div>
      </form>
    </MainLayout>
  );
};

export default CreatePostPage;
