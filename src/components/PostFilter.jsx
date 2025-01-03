import React from 'react'
import PropTypes from 'prop-types'
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
  Textarea,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export function PostFilter({ field, value, onChange }) {
  return (
    <div className='w-full max-w-lg px-0'>
      <label
        className='text-sm/6 font-medium text-white'
        htmlFor={`filter-${field}`}
      >
        {field}:{' '}
      </label>
      <input
        className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
