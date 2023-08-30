/* eslint-disable no-unused-vars */
import { useTaskContext } from "../Context";

const CompletedTask = () => {
    const { completeTask, setCompleteTask } = useTaskContext();

    const formatDate = (dateTime) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', 'hour': 'numeric', 'minute': 'numeric' };
        const date = new Date(dateTime);
        const localeDate = date.toLocaleString('en-IN', options);
        return localeDate;
    }

    return (
        <div className="dialog-parent">
            <div className="dialog">
            <p className="text-center font-bold text-lg">List of Completed Tasks</p>    
                    <table className="mt-4">
                        <thead>
                            <tr>
                                <th className="border border-black px-2 text-sm sm:text-base">Title</th>
                                <th className="border border-black px-2 text-sm sm:text-base">Due Date</th>
                                <th className="border border-black px-2 text-sm sm:text-base">Completed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completeTask.map((task,index) => (
                                <tr key={index+1}>
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