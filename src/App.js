import React from 'react';
import { Todo } from './features/todo/Todo';
import { Pomodoro } from './features/pomodoro/Pomodoro';
function App() {
  return (
    <div
      className="min-h-screen min-w-full flex flex-col md:flex-row md:justify-items-start"
      style={{ backgroundColor: '#1E2140' }}
    >
      <Todo />
      <div className="mt-5 md:mt-0" />
      <Pomodoro />
    </div>
  );
}

export default App;
