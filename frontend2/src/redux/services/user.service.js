// src/redux/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',   // unique key for the slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    // Example: Fetch all posts
    getPosts: builder.query({
      query: () => 'posts',
    }),

    // Example: Fetch single post by id
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),

    // Example: Add new post (mutation)
    addPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

// Export auto-generated hooks for components
export const { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation } = apiSlice;
