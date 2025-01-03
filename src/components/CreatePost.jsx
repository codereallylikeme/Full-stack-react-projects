import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'
import {  ToastContainer,toast } from 'react-toastify'
import "../index.css"


export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      // Show toast notification on success
      toast.success('Post created successfully!')
      // Optionally clear input fields
      setTitle('')
      setAuthor('')
      setContents('')
    },
    onError: () => {
      // Show toast notification on error
      toast.error('Failed to create post. Please try again.')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
          <label
            className='text-sm/6 font-medium text-blacked'
            htmlFor='create-title'
          >
            Title:{' '}
          </label>
          <input
            className='form-input rounded border-none px-2 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            type='text'
            placeholder='Title'
            name='create-title'
            id='create-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label
            className='text-sm/6 font-medium text-gray'
            htmlFor='create-author'
          >
            Author:{' '}
          </label>
          <input
            className='form-input rounded border-none px-2 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"'
            type='text'
            placeholder='Author'
            name='create-author'
            id='create-author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <br />
        <textarea
          rows='3'
          placeholder='what is on your mind?'
          className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <br />
        <br />
        <input
          className='inline-flex items-center gap-2 rounded-md bg-indigo-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-600 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-white'
          type='submit'
          value={createPostMutation.isLoading ? 'Creating...' : 'Create'}
          disabled={!title || createPostMutation.isLoading}
        />
      </form>
      <ToastContainer />
    </>
  )
}
