import { useState } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import { classNames } from '../../helpers';

interface Props {
  label: string;
  onSelect: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

interface Option {
  id: string;
  name: string;
}

export default function SingleDropdown({
  label,
  onSelect,
  options,
  placeholder,
}: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Option | null>(null);

  const filtered =
    query === ''
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as='div'
      value={selected}
      onChange={(value) => {
        setSelected(value);
        onSelect(value.id);
      }}
    >
      <Combobox.Label className='block text-sm font-medium text-gray-700'>
        {label}
      </Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Input
          className='w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm'
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: Option) => (option ? option.name : '')}
          placeholder={placeholder}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
          <SelectorIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>

        {filtered.length > 0 && (
          <Combobox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filtered.map((option) => (
              <Combobox.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-red-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {option.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-red-600'
                        )}
                      >
                        <CheckIcon className='w-5 h-5' aria-hidden='true' />
                      </span>
                    )}
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
