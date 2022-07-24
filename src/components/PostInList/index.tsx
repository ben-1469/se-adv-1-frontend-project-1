import { Menu, Transition } from '@headlessui/react';
import {
  ChatAltIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_PICTURE } from '../../constants';
import { classNames } from '../../helpers';
import { Post } from '../../interfaces';

type Props = {
  post: Post;
  currentlyLoggedInUserId: string;
  handleDeletePost: (postId: string) => void;
};

const PostInList = ({
  post,
  currentlyLoggedInUserId,
  handleDeletePost,
}: Props) => {
  return (
    <li
      key={post.id}
      className='px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg'
    >
      <article>
        <div>
          <div className='flex space-x-3'>
            <div className='flex-shrink-0'>
              <img
                className='w-10 h-10 rounded-full'
                src={post?.user?.avatar || DEFAULT_PROFILE_PICTURE}
                alt=''
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900'>
                <Link to={`/user/${post.user.id}`} className='hover:underline'>
                  {post.user.firstName} {post.user.lastName}
                </Link>
              </p>
              <p className='text-sm text-gray-500'>
                <time dateTime={post.createdAt.toString()}>
                  {post.createdAt.toString()}
                </time>
              </p>
            </div>
            <div className='flex self-center flex-shrink-0'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600'>
                    <span className='sr-only'>Open options</span>
                    <DotsVerticalIcon className='w-5 h-5' aria-hidden='true' />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'flex px-4 py-2 text-sm',
                            )}
                          >
                            <StarIcon
                              className='w-5 h-5 mr-3 text-gray-400'
                              aria-hidden='true'
                            />
                            <span>Add to favorites</span>
                          </a>
                        )}
                      </Menu.Item>

                      {+currentlyLoggedInUserId === post.user.id && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => handleDeletePost(post.id)}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'flex px-4 py-2 text-sm',
                              )}
                            >
                              <FlagIcon
                                className='w-5 h-5 mr-3 text-gray-400'
                                aria-hidden='true'
                              />
                              <span>Delete post</span>
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <h2 className='mt-4 text-base font-medium text-gray-900'>
            {post.title}
          </h2>
        </div>
        <div
          className='mt-2 space-y-4 text-sm text-gray-700'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className='flex justify-between mt-6 space-x-8'>
          <div className='flex space-x-6'>
            <span className='inline-flex items-center text-sm'>
              <button
                type='button'
                className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
              >
                <ThumbUpIcon className='w-5 h-5' aria-hidden='true' />
                <span className='font-medium text-gray-900'>
                  {post.likes || 0}
                </span>
                <span className='sr-only'>likes</span>
              </button>
            </span>
            <span className='inline-flex items-center text-sm'>
              <button
                type='button'
                className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
              >
                <ChatAltIcon className='w-5 h-5' aria-hidden='true' />
                <span className='font-medium text-gray-900'>
                  {post?.comments?.length || 0}
                </span>
                <span className='sr-only'>replies</span>
              </button>
            </span>
            <span className='inline-flex items-center text-sm'>
              <button
                type='button'
                className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
              >
                <EyeIcon className='w-5 h-5' aria-hidden='true' />
                <span className='font-medium text-gray-900'>
                  {post.viewCount}
                </span>
                <span className='sr-only'>views</span>
              </button>
            </span>
          </div>
          <div className='flex text-sm'>
            <span className='inline-flex items-center text-sm'>
              <button
                type='button'
                className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
              >
                <ShareIcon className='w-5 h-5' aria-hidden='true' />
                <span className='font-medium text-gray-900'>Share</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostInList;
