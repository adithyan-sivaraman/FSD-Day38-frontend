/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import './App.css';
import AddTask from './Components/AddTask';
import FetchTask from './Components/FetchTask';
import { TaskProvider } from './Context';
function App() {

  return (
    <TaskProvider>
      
      <div className='flex flex-col sm:flex-row w-full h-screen'>
        <AddTask />
        <div className='flex flex-col grow bg-blue-400 px-2 overflow-y-scroll py-2 sm:py-0'>
          <h1 className='text-2xl font-bold uppercase bg-blue-200 flex items-center justify-center mt-2 rounded-md py-2'><span className='material-icons'>task</span>TASKS</h1>
          <FetchTask />
        </div>
      </div>
    </TaskProvider>
  )
}

export default App;
