import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

const store = configureStore({ reducer: rootReducer })

export type Dispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
