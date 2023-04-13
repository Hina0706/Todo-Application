import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        todo: action.payload.todo,
        completed: false,
        category: action.payload.category,
        selectedStartTime: action.payload.selectedStartTime,
        selectedEndTime: action.payload.selectedEndTime,
        priority: action.payload.priority,
        user: action.payload.user,
      };
      return [...state, newTodo];
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload.id);
    },
    selectTodo: () => {
    },
  },
});

export const {addTodo, toggleComplete, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
