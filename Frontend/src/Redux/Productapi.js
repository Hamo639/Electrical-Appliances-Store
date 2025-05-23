// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-jzsn81pxg-hamo639s-projects.vercel.app/' }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: (name) => `products`,
    }),
  }),
})
export const oneproductsApi = createApi({
  reducerPath: 'oneproductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-jzsn81pxg-hamo639s-projects.vercel.app /' }),
  endpoints: (builder) => ({
    getoneproductByName: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductsByNameQuery } = productsApi
export const { useGetoneproductByNameQuery } = oneproductsApi