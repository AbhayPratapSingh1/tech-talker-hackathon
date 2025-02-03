import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./features/slices/appSlice"

export default configureStore({
  reducer: {
    app : appReducer,
  },
})