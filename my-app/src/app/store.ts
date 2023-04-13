import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../../../frontend/components/redux/actions/userSlice';
import todoReducer from '../../../frontend/components/redux/actions/todoSlice';

export const userStore = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
});

export type AppDispatch = typeof userStore.dispatch;
export type RootState = ReturnType<typeof userStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
