import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import { classNames } from '../../helpers';
import { Post } from '../../interfaces';

interface Props {
  query: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: Post[];
}

export default function SearchBox({ query, handleInputChange, data }: Props) {
  const [selectedPerson, setSelectedPerson] = useState();

  return (
    <Combobox as='div' value={selectedPerson} onChange={setSelectedPerson}>
      <div className='relative mt-1'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <SearchIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </div>
        <Combobox.Input
          className='w-full py-2 pl-10 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm'
          onChange={handleInputChange}
          value={query}
        />

        {data.length > 0 && (
          <Combobox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {data.map((post) => (
              <Combobox.Option
                key={post.id}
                value={post}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-red-600 text-white' : 'text-gray-900',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <img
                        src={post.user.profilePic}
                        alt=''
                        className='flex-shrink-0 w-6 h-6 rounded-full'
                      />
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold',
                        )}
                      >
                        {post.title}
                      </span>
                    </div>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
