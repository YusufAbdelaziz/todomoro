import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todo/todosSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
