import React from 'react';
import { Group } from '../../interfaces';

type Props = {
  groups: Group[];
};

const GroupList = ({ groups }: Props) => {
  return (
    <div className='pt-10'>
      <p
        className='px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase'
        id='communities-headline'
      >
        Groups
      </p>
      <div className='mt-3 space-y-2' aria-labelledby='communities-headline'>
        {groups.map((group) => (
          <a
            key={group.id}
            href={`/group/${group.id}`}
            className='flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50'
          >
            <span className='truncate'>{group.name}</span>
            <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800'>
              {group?.posts?.length}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
