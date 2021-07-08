import {
  createSlice,
  createEntityAdapter,
  nanoid,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { parseISO, compareAsc } from 'date-fns';
import localForage from 'localforage';

function pickRandomCompletionIcon() {
  const icons = [
    '😎',
    '🐱‍🏍',
    '🐱‍💻',
    '🐱‍👓',
    '🐱‍🐉',
    '🤩',
    '🐱‍👤',
    '💥',
    '🦾',
    '🤓',
    '🙌',
    '👏',
    '🤠',
  ];
  return icons[Math.floor(Math.random(0) * icons.length)];
}

// Sort the todos depending on their addition date.
const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return compareAsc(parseISO(a.date), parseISO(b.date));
  },
});

// Adding isLoading field to fetch stored todos in localForage asynchronously.
const initialState = todosAdapter.getInitialState({
  isLoading: false,
  error: false,
});
const todosFetched = createAsyncThunk('todos/todosFetched', async () => {
  const todos = await localForage.getItem('todos');
  if (!todos) {
    return null;
  }
  return todos;
});
const todosSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    todoAdded: {
      prepare(task) {
        const id = nanoid();
        return {
          payload: {
            task,
            completionEmoji: pickRandomCompletionIcon(),
            hasCompleted: false,
            id,
            date: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        todosAdapter.addOne(state, action.payload);
      },
    },
    todoUpdated: todosAdapter.updateOne,
    todoRemoved: todosAdapter.removeOne,
  },
  extraReducers: {
    [todosFetched.pending]: state => {
      state.isLoading = true;
    },
    [todosFetched.rejected]: state => {
      state.error = true;
      state.entities = [];
    },
    [todosFetched.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (isObject(action.payload)) {
        todosAdapter.addMany(state, action.payload.entities);
      }
    },
  },
});
const { todoAdded, todoUpdated, todoRemoved } = todosSlice.actions;

const todoThunkAdded = createAsyncThunk(
  'todos/todoThunkAdded',
  async (task, { dispatch, getState }) => {
    dispatch(todoAdded(task));
    try {
      await localForage.setItem('todos', getState().todos);
    } catch (e) {
      console.log(e);
    }
  }
);
const todoThunkUpdated = createAsyncThunk(
  'todos/todoThunkUpdated',
  async (changes, { dispatch, getState }) => {
    dispatch(todoUpdated(changes));
    await localForage.setItem('todos', getState().todos);
  }
);
const todoThunkRemoved = createAsyncThunk(
  'todos/todoThunkRemoved',
  async (id, { dispatch, getState }) => {
    dispatch(todoRemoved(id));
    console.log(getState());
    await localForage.setItem('todos', getState().todos);
  }
);
export { todoThunkAdded, todoThunkUpdated, todoThunkRemoved, todosFetched };

export default todosSlice.reducer;

export const {
  selectById: selectTodoById,
  selectAll: selectAllTodos,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors(state => state.todos);

function isObject(item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null;
}
