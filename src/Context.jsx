/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, createContext, useState } from 'react';
import apiEndPoint from './config';
const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [taskData, setTaskData] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);
  const updateTaskData = async (action,data) => {
    try {
    
    
      if(action==="update"){
        setTaskData(data);
      }
      else if(action==="add"){
        setTaskData((previous)=>[...previous,data])
      }
      else if(action==="complete"){
        setCompleteTask((previous)=>[...previous,data])
      }
      else {
        const request = await fetch(`${apiEndPoint}/task/fetch`);
        const response = await request.json();
        setTaskData(response['pending']);
        setCompleteTask(response['complete']);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ taskData, updateTaskData,completeTask,setCompleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
