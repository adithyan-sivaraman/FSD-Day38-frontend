/* eslint-disable no-unused-vars */
import { useTaskContext } from "../Context";

const CompletedTask = () => {
    const { completeTask, setCompleteTask,setPopupVisible } = useTaskContext();

    const formatDate = (dateTime) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', 'hour': 'numeric', 'minute': 'numeric' };
        const date = new Date(dateTime);
        const localeDate = date.toLocaleString('en-IN', options);
        return localeDate;
    }

    return (
        <div className="dialog-parent">
            <div className="dialog">
            <div className="flex flex-row justify-between">
            <p className="text-center font-bold text-lg">List of Completed Tasks</p>    
            <button 
            onClick={() =>setPopupVisible(false)}
                title="close"
                className="text-lg px-4 text-blue-900  hover:bg-red-500 hover:text-white">X</button>
            </div>
            
                    <table className="mt-4">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="border border-white px-2 text-sm sm:text-base">Title</th>
                                <th className="border border-white px-2 text-sm sm:text-base">Due Date</th>
                                <th className="border border-white px-2 text-sm sm:text-base">Completed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completeTask.map((task,index) => (
                                <tr key={index+1} className="hover:bg-cyan-500">
                                    <td className="border border-black px-2 text-sm sm:text-base">{task.title}</td>
                                    <td className="border border-black px-2 text-sm sm:text-base">{formatDate(task.date)}</td>
                                    <td className="border border-black px-2 text-sm sm:text-base">{formatDate(task.completed)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
            </div>
        </div>
    );

}
export default CompletedTask;