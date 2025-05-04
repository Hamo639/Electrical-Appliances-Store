import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { oneproductsApi, productsApi } from './Productapi.js'
import counterReducer from '../Redux/Productslice'


export const store = configureStore({
  reducer: {
    cartt: counterReducer,

    // Add the generated reducer as a specific top-level slice
    [productsApi.reducerPath]: productsApi.reducer,
    [oneproductsApi.reducerPath]: oneproductsApi.reducer,

  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware)
  .concat(oneproductsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)