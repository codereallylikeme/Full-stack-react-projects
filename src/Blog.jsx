import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import { PostList } from "./components/PostList"
import { CreatePost } from "./components/CreatePost"
import { PostFilter } from "./components/PostFilter"
import { PostSorting } from "./components/PostSorting"
import { getPosts } from './api/posts'
import  './index.css'





export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })
  const posts = postsQuery.data ?? []

  return (
      <section className='max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:max-w-7xl p-2'>
      <div className='flex flex-col md:flex-col bg-indigo-50 min-h-screen p-6 space-y-6 md:space-y-0 md:space-x-6'>
         {/* Create Post Section */}
              <div className='bg-white shadow-lg rounded-lg p-6'>
      <h2 className='text-xl capitalize font-bold text-indigo-600 mb-4 text-center'>
             Create a Post
           </h2>
           <CreatePost />
         </div>

         {/* Filters and Sorting Section */}
         <div className='flex-1 bg-white shadow-lg rounded-lg p-6'>
           <h2 className='text-xl capitalize font-bold text-indigo-600 mb-4 text-center'>
             Filters & Sorting
           </h2>
           <div className='mb-4'>
             <label className='block text-gray-700 font-medium mb-2'>
               Filter by Author:
             </label>
             <PostFilter
               field='author'
               value={author}
               onChange={(value) => setAuthor(value)}
               className='w-full border border-gray-300 rounded-lg p-2'
             />
           </div>
           <div>
             <label className='block text-gray-700 font-medium mb-2'>
               Sort By:
             </label>
             <PostSorting
               fields={['createdAt', 'updatedAt']}
               value={sortBy}
               onChange={(value) => setSortBy(value)}
               orderValue={sortOrder}
               onOrderChange={(orderValue) => setSortOrder(orderValue)}
               className='w-full border border-gray-300 rounded-lg p-2'
             />
           </div>
         </div>

         {/* Post List Section */}
         <div className='flex-1 bg-white shadow-lg rounded-lg p-6'>
           <h2 className='text-xl capitalize font-bold text-indigo-600 mb-4'>
             Post List
           </h2>
           <PostList posts={posts} />
         </div>
       </div>
     </section> 
    
  )
} 