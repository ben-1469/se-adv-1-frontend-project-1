import { PlusIcon, SparklesIcon } from '@heroicons/react/solid';
import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaFunction?: () => void;
};

const EmptyState = ({ title, subtitle, ctaText, ctaFunction }: Props) => {
  return (
    <div className='flex flex-col items-center text-center'>
      <SparklesIcon className='w-5 h-5' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>

      {ctaText && ctaFunction && (
        <div className='mt-6'>
          <button
            type='button'
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            onClick={ctaFunction}
          >
            <PlusIcon className='w-5 h-5 mr-2 -ml-1' aria-hidden='true' />
            {ctaText}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
