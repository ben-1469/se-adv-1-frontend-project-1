import { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { classNames } from '../../helpers';
import { FireIcon, PaperClipIcon } from '@heroicons/react/solid';
import { moods } from '../../constants';
import { Mood } from '../../interfaces';

type Props = {
  newComment: string;
  setNewComment: (value: string) => void;
  mood: Mood;
  setMood: (value: Mood) => void;
  profilePic: string;
  handleCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CommentEditor = ({
  newComment,
  setNewComment,
  mood,
  setMood,
  profilePic,
  handleCommentSubmit,
}: Props) => {
  return (
    <div className='flex items-start space-x-4'>
      <div className='flex-shrink-0'>
        <img
          className='inline-block w-10 h-10 rounded-full'
          src={profilePic}
          alt=''
        />
      </div>
      <div className='flex-1 min-w-0'>
        <form action='#' className='relative' onSubmit={handleCommentSubmit}>
          <div className='overflow-hidden border border-gray-300 rounded-lg shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
            <label htmlFor='comment' className='sr-only'>
              Add your comment
            </label>
            <textarea
              rows={3}
              name='comment'
              id='comment'
              className='block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm'
              placeholder='Add your comment...'
              defaultValue={''}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className='py-2' aria-hidden='true'>
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className='py-px'>
                <div className='h-9' />
              </div>
            </div>
          </div>

          <div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
            <div className='flex items-center space-x-5'>
              <div className='flex items-center'>
                <Listbox value={mood} onChange={setMood}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className='sr-only'>
                        {' '}
                        Your mood{' '}
                      </Listbox.Label>
                      <div className='relative'>
                        <Listbox.Button className='relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                          <span className='flex items-center justify-center'>
                            {mood.value === null ? (
                              <span>
                                <FireIcon
                                  className='flex-shrink-0 w-5 h-5'
                                  aria-hidden='true'
                                />
                                <span className='sr-only'> Add your mood </span>
                              </span>
                            ) : (
                              <span>
                                <span
                                  className={classNames(
                                    mood.bgColor,
                                    'flex h-8 w-8 items-center justify-center rounded-full',
                                  )}
                                >
                                  <mood.icon
                                    className='flex-shrink-0 w-5 h-5 text-white'
                                    aria-hidden='true'
                                  />
                                </span>
                                <span className='sr-only'>{mood.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Listbox.Options className='absolute z-10 py-3 mt-1 -ml-6 text-base bg-white rounded-lg shadow w-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm'>
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'relative cursor-default select-none py-2 px-3',
                                  )
                                }
                                value={mood}
                              >
                                <div className='flex items-center'>
                                  <div
                                    className={classNames(
                                      mood.bgColor,
                                      'w-8 h-8 rounded-full flex items-center justify-center',
                                    )}
                                  >
                                    <mood.icon
                                      className={classNames(
                                        mood.iconColor,
                                        'flex-shrink-0 h-5 w-5',
                                      )}
                                      aria-hidden='true'
                                    />
                                  </div>
                                  <span className='block ml-3 font-medium truncate'>
                                    {mood.name}
                                  </span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className='flex-shrink-0'>
              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentEditor;
