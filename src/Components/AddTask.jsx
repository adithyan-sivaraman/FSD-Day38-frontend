import { useState } from "react";
import apiEndpoint from '../config'
import { useTaskContext } from '../Context';
const AddTask = () => {
    const initialState = {
        "title": '',
        "date": '',
        "status": 'pending',
    }
    const [formData, setFormData] = useState(initialState);

    const { completeTask, updateTaskData,popUpVisible, setPopupVisible}  = useTaskContext();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === "date") {
            let date = new Date(value);
            let curDt = new Date();
            if (curDt > date) {
                setDialogText("Task date cannot be less than current date and time");
                setDialogVisible(true);
                setTimeout(() => {
                    setDialogVisible(false);
                }, 2000)
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${apiEndpoint}/task/add`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            if (response.status === 200 && responseData) {
                setDialogText("Task added successfully")
                setDialogVisible(true);
                updateTaskData('add',formData);
                setTimeout(() => {
                    setDialogVisible(false);
                }, 2000)
            setFormData(initialState)
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-start justify-start w-full sm:w-1/4 lg:w-1/5 border-2 h-60 sm:h-screen bg-blue-200">
        
            <p className="text-base sm:text-lg: lg:text-xl font-extrabold px-2 py-2 flex flex-row items-center"><span className="material-icons">add</span>Add a Task</p>
            <form className="px-2 w-full" onSubmit={handleSubmit}>
                <label htmlFor="title" className="text-base capitalize font-bold sm:mt-4 block">Title</label>
                <textarea
                    onInput={handleInput}
                    value={formData.title}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="enter title"
                    className="text-xs sm:text-sm lg:text-base w-full border-2 p-2 mt-4"
                    required ></textarea>

                <label htmlFor="date" className="text-base capitalize font-bold sm:mt-4 block">Due Date</label>
                <input
                    onInput={handleInput}
                    value={formData.date}
                    type="datetime-local"
                    name="date"
                    id="date"
                    className="text-xs sm:text-sm lg:text-base w-full mt-2 border-2 p-2"
                    required />
                <button type="submit" className="text-base mt-2 px-4 py-1 bg-black text-white select-none">Add</button>

            </form>
            {dialogVisible && (
                <dialog className="fixed top-0 z-20 py-2 px-2 rounded-md" open >
                    <p className="text-lg font-bold px-4 tracking-wide">Alert! </p>
                    <p className="text-lg px-4 tracking-wider">{dialogText} </p>
                </dialog>
            )}

            {completeTask.length > 0 && (
                <button
                    type="button"
                    className="text-base mt-4 px-4 py-1 ml-2 bg-black text-white select-none z-50 "
                    onClick={() => setPopupVisible(!popUpVisible)}
                >Completed</button>
            )}

        </div>
    )
}

export default AddTask;