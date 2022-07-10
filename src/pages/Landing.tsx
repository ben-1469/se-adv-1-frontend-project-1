import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusSmIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import {
  BellIcon,
  FireIcon,
  HomeIcon,
  MenuIcon,
  TrendingUpIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Popular', href: '#', icon: FireIcon, current: false },
  { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
const communities = [
  { name: 'Movies', href: '#' },
  { name: 'Food', href: '#' },
  { name: 'Sports', href: '#' },
  { name: 'Animals', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'Dinosaurs', href: '#' },
  { name: 'Talents', href: '#' },
  { name: 'Gaming', href: '#' },
];
const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
];

const whoToFollow = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
    comments: 291,
  },
  // More posts...
];

interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  userId: number;
  groupId: number;
  tagId: number;
  group: any;
  tag: any;
  user: any;
  comments: [];
  likes: [];
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  id: string;
}

function LandingPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const postResponse = await fetch('http://localhost:4000/posts');
    const userResponse = await fetch('http://localhost:4000/users');
    const postData = await postResponse.json();
    const userData = await userResponse.json();
    setAllUsers(userData);
    setAllPosts(postData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='min-h-full'>
        {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
        <Popover
          as='header'
          className={({ open }) =>
            classNames(
              open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
              'bg-white shadow-sm lg:static lg:overflow-y-visible'
            )
          }
        >
          {({ open }) => (
            <>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8'>
                  <div className='flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2'>
                    <div className='flex items-center flex-shrink-0'>
                      <a href='#'>
                        <img
                          className='block w-auto h-8'
                          src='https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500'
                          alt='Workflow'
                        />
                      </a>
                    </div>
                  </div>
                  <div className='flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6'>
                    <div className='flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0'>
                      <div className='w-full'>
                        <label htmlFor='search' className='sr-only'>
                          Search
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <SearchIcon
                              className='w-5 h-5 text-gray-400'
                              aria-hidden='true'
                            />
                          </div>
                          <input
                            id='search'
                            name='search'
                            className='block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm'
                            placeholder='Search'
                            type='search'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden'>
                    {/* Mobile menu button */}
                    <Popover.Button className='inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500'>
                      <span className='sr-only'>Open menu</span>
                      {open ? (
                        <XIcon className='block w-6 h-6' aria-hidden='true' />
                      ) : (
                        <MenuIcon
                          className='block w-6 h-6'
                          aria-hidden='true'
                        />
                      )}
                    </Popover.Button>
                  </div>
                  <div className='hidden lg:flex lg:items-center lg:justify-end xl:col-span-4'>
                    <a
                      href='#'
                      className='text-sm font-medium text-gray-900 hover:underline'
                    >
                      Go Premium
                    </a>
                    <a
                      href='#'
                      className='flex-shrink-0 p-1 ml-5 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='w-6 h-6' aria-hidden='true' />
                    </a>

                    {/* Profile dropdown */}
                    <Menu as='div' className='relative flex-shrink-0 ml-5'>
                      <div>
                        <Menu.Button className='flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='w-8 h-8 rounded-full'
                            src={user.imageUrl}
                            alt=''
                          />
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
                        <Menu.Items className='absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block py-2 px-4 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <a
                      href='#'
                      className='inline-flex items-center px-4 py-2 ml-6 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      New Post
                    </a>
                  </div>
                </div>
              </div>

              <Popover.Panel as='nav' className='lg:hidden' aria-label='Global'>
                <div className='max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'hover:bg-gray-50',
                        'block rounded-md py-2 px-3 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='pt-4 border-t border-gray-200'>
                  <div className='flex items-center max-w-3xl px-4 mx-auto sm:px-6'>
                    <div className='flex-shrink-0'>
                      <img
                        className='w-10 h-10 rounded-full'
                        src={user.imageUrl}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium text-gray-800'>
                        {user.name}
                      </div>
                      <div className='text-sm font-medium text-gray-500'>
                        {user.email}
                      </div>
                    </div>
                    <button
                      type='button'
                      className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='w-6 h-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4'>
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900'
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className='max-w-3xl px-4 mx-auto mt-6 sm:px-6'>
                  <a
                    href='#'
                    className='flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700'
                  >
                    New Post
                  </a>

                  <div className='flex justify-center mt-6'>
                    <a
                      href='#'
                      className='text-base font-medium text-gray-900 hover:underline'
                    >
                      Go Premium
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>

        <div className='py-10'>
          <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
            <div className='hidden lg:block lg:col-span-3 xl:col-span-2'>
              <nav
                aria-label='Sidebar'
                className='sticky divide-y divide-gray-300 top-4'
              >
                <div className='pb-8 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50',
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden='true'
                      />
                      <span className='truncate'>{item.name}</span>
                    </a>
                  ))}
                </div>
                <div className='pt-10'>
                  <p
                    className='px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase'
                    id='communities-headline'
                  >
                    My communities
                  </p>
                  <div
                    className='mt-3 space-y-2'
                    aria-labelledby='communities-headline'
                  >
                    {communities.map((community) => (
                      <a
                        key={community.name}
                        href={community.href}
                        className='flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50'
                      >
                        <span className='truncate'>{community.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className='lg:col-span-9 xl:col-span-6'>
              <div className='px-4 sm:px-0'>
                <div className='sm:hidden'>
                  <label htmlFor='question-tabs' className='sr-only'>
                    Select a tab
                  </label>
                  <select
                    id='question-tabs'
                    className='block w-full text-base font-medium text-gray-900 border-gray-300 rounded-md shadow-sm focus:border-rose-500 focus:ring-rose-500'
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className='hidden sm:block'>
                  <nav
                    className='relative z-0 flex divide-x divide-gray-200 rounded-lg shadow'
                    aria-label='Tabs'
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? 'page' : undefined}
                        className={classNames(
                          tab.current
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden='true'
                          className={classNames(
                            tab.current ? 'bg-rose-500' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className='mt-4'>
                <h1 className='sr-only'>Recent questions</h1>
                <ul role='list' className='space-y-4'>
                  {allPosts.map((post) => (
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
                                // src={question.author.imageUrl}
                                alt=''
                              />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-900'>
                                <a
                                  // href={question.author.href}
                                  className='hover:underline'
                                >
                                  {post.title}
                                </a>
                              </p>
                              <p className='text-sm text-gray-500'>
                                <a className='hover:underline'>
                                  <time dateTime={post.createdAt.toString()}>
                                    {post.createdAt.toString()}
                                  </time>
                                </a>
                              </p>
                            </div>
                            <div className='flex self-center flex-shrink-0'>
                              <Menu
                                as='div'
                                className='relative inline-block text-left'
                              >
                                <div>
                                  <Menu.Button className='flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600'>
                                    <span className='sr-only'>
                                      Open options
                                    </span>
                                    <DotsVerticalIcon
                                      className='w-5 h-5'
                                      aria-hidden='true'
                                    />
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
                                              'flex px-4 py-2 text-sm'
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
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href='#'
                                            className={classNames(
                                              active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                              'flex px-4 py-2 text-sm'
                                            )}
                                          >
                                            <CodeIcon
                                              className='w-5 h-5 mr-3 text-gray-400'
                                              aria-hidden='true'
                                            />
                                            <span>Embed</span>
                                          </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href='#'
                                            className={classNames(
                                              active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                              'flex px-4 py-2 text-sm'
                                            )}
                                          >
                                            <FlagIcon
                                              className='w-5 h-5 mr-3 text-gray-400'
                                              aria-hidden='true'
                                            />
                                            <span>Report content</span>
                                          </a>
                                        )}
                                      </Menu.Item>
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
                                <ThumbUpIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                                <span className='font-medium text-gray-900'>
                                  {post.likes}
                                </span>
                                <span className='sr-only'>likes</span>
                              </button>
                            </span>
                            <span className='inline-flex items-center text-sm'>
                              <button
                                type='button'
                                className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
                              >
                                <ChatAltIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                                <span className='font-medium text-gray-900'>
                                  {post?.comments?.length}
                                </span>
                                <span className='sr-only'>replies</span>
                              </button>
                            </span>
                            <span className='inline-flex items-center text-sm'>
                              <button
                                type='button'
                                className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
                              >
                                <EyeIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
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
                                <ShareIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                                <span className='font-medium text-gray-900'>
                                  Share
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
            <aside className='hidden xl:block xl:col-span-4'>
              <div className='sticky space-y-4 top-4'>
                <section aria-labelledby='who-to-follow-heading'>
                  <div className='bg-white rounded-lg shadow'>
                    <div className='p-6'>
                      <h2
                        id='who-to-follow-heading'
                        className='text-base font-medium text-gray-900'
                      >
                        Who to friend
                      </h2>
                      <div className='flow-root mt-6'>
                        <ul
                          role='list'
                          className='-my-4 divide-y divide-gray-200'
                        >
                          {allUsers.map((user) => (
                            <li
                              key={user.id}
                              className='flex items-center py-4 space-x-3'
                            >
                              <div className='flex-shrink-0'>
                                <img
                                  className='w-8 h-8 rounded-full'
                                  // src={user.imageUrl}
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
                                  <Link to={`/user/${user.id}`}>
                                    {'@' + user.username}
                                  </Link>
                                </p>
                              </div>
                              <div className='flex-shrink-0'>
                                <button
                                  type='button'
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
                          ))}
                        </ul>
                      </div>
                      <div className='mt-6'>
                        <a
                          href='#'
                          className='block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby='trending-heading'>
                  <div className='bg-white rounded-lg shadow'>
                    <div className='p-6'>
                      <h2
                        id='trending-heading'
                        className='text-base font-medium text-gray-900'
                      >
                        Trending
                      </h2>
                      <div className='flow-root mt-6'>
                        <ul
                          role='list'
                          className='-my-4 divide-y divide-gray-200'
                        >
                          {trendingPosts.map((post) => (
                            <li key={post.id} className='flex py-4 space-x-3'>
                              <div className='flex-shrink-0'>
                                <img
                                  className='w-8 h-8 rounded-full'
                                  src={post.user.imageUrl}
                                  alt={post.user.name}
                                />
                              </div>
                              <div className='flex-1 min-w-0'>
                                <p className='text-sm text-gray-800'>
                                  {post.body}
                                </p>
                                <div className='flex mt-2'>
                                  <span className='inline-flex items-center text-sm'>
                                    <button
                                      type='button'
                                      className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
                                    >
                                      <ChatAltIcon
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                      />
                                      <span className='font-medium text-gray-900'>
                                        {post.comments}
                                      </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='mt-6'>
                        <a
                          href='#'
                          className='block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
