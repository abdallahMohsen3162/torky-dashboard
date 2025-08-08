import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth";
import { uploadApi } from "./upload";
import { suppliersApi } from "./suppliers";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [suppliersApi.reducerPath]: suppliersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, uploadApi.middleware, suppliersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
