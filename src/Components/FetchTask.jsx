/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTaskContext } from '../Context';
import { Tooltip } from 'react-tooltip';

import apiEndpoint from '../config'
const FetchTask = () => {
    const { taskData, updateTaskData } = useTaskContext();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogText, setDialogText] = useState('')
   
    useEffect(() => {
        updateTaskData();
    }, []);

    const handleButtonClick = async() =>{
       try{
        const completeTask = taskData.filter(task=>task.status==='complete');
        const pendingTasks = taskData.filter(task => task.status === 'pending');
        const request = await fetch(`${apiEndpoint}/task/complete`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(completeTask),
        })

        if(request.status === 200){
            setDialogText('Updated Successfully');
            setDialogVisible(true);
            setTimeout(()=>{
                setDialogVisible(false);
            },2000);

        }
        updateTaskData();
        updateTaskData('update',pendingTasks)
       }
       catch(error){
        console.log(error);
       }
        
    }
    const handleClick = (id) => {
        
        const newTaskData = taskData.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: task.status === 'pending' ? 'complete' : 'pending',
                };
            }

            return task;
        })
        const count = newTaskData.filter(task => task.status === 'complete').length;
        setButtonDisabled(count !== 0 ? false : true);
       updateTaskData('update',newTaskData)
    };

    const formatDate = (dateTime) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', 'hour': 'numeric', 'minute': 'numeric' };
        const date = new Date(dateTime);
        const curDt = new Date();
        const overDue = curDt > date ? "overdue" : "";
        const spanClass = overDue ? "text-sm font-bold bg-red-900 px-2 text-white":"text-sm"
        const localeDate = date.toLocaleString('en-IN', options);
        return (
            <div className='flex flex-row px-2'>
                <span className="material-icons text-sm">calendar_today</span>
                <p className='text-sm  px-2 flex items-center tracking-wider w-44'>{localeDate}</p>
                <span className={spanClass}>{overDue}</span>
            </div>
        )

    }
    return (
        <div className='flex flex-col'>
     
            {taskData.length > 0 && (
                <div key="btn">
                    <button
                         onClick={handleButtonClick}
                        type='button'
                        data-tooltip-id='tooltip'
                        disabled={buttonDisabled}
                        className='text-base bg-black text-white px-4 py-1 mt-2 w-16  select-none'>Save
                    </button>
                    <Tooltip
                        style={{ borderRadius: '5px', marginTop: '-5px' }}
                        id='tooltip'
                        place='right-start'
                        variant={buttonDisabled ? 'error' : 'success'}
                        content={buttonDisabled ? 'no changes made' : 'click to save'} />
                </div>
            )}
            {taskData.length > 0 ? (
                taskData.map((task,index) => (
                    <div
                        className={`flex flex-row items-center bg-white rounded-md w-full px-2 py-1 mt-2 select-none `}
                        key={index+1}>
                        <span
                            className="material-icons cursor-pointer"
                            onClick={() => handleClick(task.id)}>
                            {task['status'] === "pending" ? "radio_button_unchecked" : "check_circle"}
                        </span>
                        <div className='flex flex-col'>
                            <p className={`text-sm sm:text-base lg:text-lg ml-2 ${task.status !== 'pending' ? 'line-through strikethrough' : ''}`}>{task.title}</p>
                            {formatDate(task.date)}

                        </div>
                    </div>
                ))
            ) : (
                <div
                    className="flex flex-row bg-white rounded-md w-full px-2 py-1 mt-2"
                    key="task">
                    <p>There are no Pending Tasks</p>
                </div>
            )}
            {dialogVisible && (
                <dialog className="fixed top-0 z-20 py-2 px-2 rounded-md" open >
                    <p className="text-lg font-bold px-4 tracking-wide">Alert! </p>
                    <p className="text-lg px-4 tracking-wider">{dialogText} </p>
                </dialog>
            )}
        </div>
    );
};

export default FetchTask;
