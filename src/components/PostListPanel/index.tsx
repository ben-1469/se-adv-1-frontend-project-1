import { ChatAltIcon } from '@heroicons/react/solid';

type Props = {};

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

export default function PostListPanel({}: Props) {
  return (
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
            <ul role='list' className='-my-4 divide-y divide-gray-200'>
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
                    <p className='text-sm text-gray-800'>{post.body}</p>
                    <div className='flex mt-2'>
                      <span className='inline-flex items-center text-sm'>
                        <button
                          type='button'
                          className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
                        >
                          <ChatAltIcon className='w-5 h-5' aria-hidden='true' />
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
  );
}
