import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { compareAsc } from 'date-fns/esm';

function pickRandomCompeletionIcon() {
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

const initialState = todosAdapter.getInitialState();

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
            completetionEmoji: pickRandomCompeletionIcon(),
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
});

export const { todoAdded, todoUpdated, todoRemoved } = todosSlice.actions;

export default todosSlice.reducer;

export const {
  selectById: selectTodoById,
  selectAll: selectAllTodos,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors(state => state.todos);
