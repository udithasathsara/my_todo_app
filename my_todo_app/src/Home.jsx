import React, { useState } from 'react';
import axios from 'axios'

const Home = ()=>{
    const [tab, setTab] = useState(1);
    const [task, setTask] = useState(null);
    const [taskDesc, setTaskDesc] = useState(null);

    const handleTabs = (tab) =>{
        setTab(tab);
    }

    const handleAddTask = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/new-task' , {task,taskDesc})
    }



    return(
        <div className='bg-gray-100 w-screen h-screen'>
            <div className='flex flex-col w-screen h-screen justify-center items-center'>
                <div>
                    <h1 className='font-bold text-3xl text-zinc-950 mb-4' >ToDo List</h1>
                </div>
                <div className='flex gap-3'>
                    <input value={task} onChange={e => setTask(e.target.value)} className="bg-gray-100 text-zinc-950 p-2 outline-none border border-blue-300 rounded-md w-64" type="text" placeholder='Enter Task Name' />
                    <input value={taskDesc} onChange={e => setTaskDesc(e.target.value)}className="bg-gray-100 text-zinc-950 p-2 outline-none border border-blue-300 rounded-md w-64" type="text" placeholder='Enter Task Description'/>
                    <button onClick={handleAddTask} className='bg-blue-600 px-4 rounded-md text-2xl'>ADD</button>
                </div>
                <div className='text-zinc-950 flex tex-sm w-[540px]  justify-evenly mt-4'>
                    <p onClick={()=> handleTabs(1)} className={`${tab === 1 ? 'text-blue-700':'text-black'} cursor-pointer`}>All</p>
                    <p onClick={()=> handleTabs(2)} className={`${tab === 2 ? 'text-blue-700':'text-black'} cursor-pointer`}>Active</p>
                    <p onClick={()=> handleTabs(3)} className={`${tab === 3 ? 'text-blue-700':'text-black'} cursor-pointer`}>Completed</p>
                </div>
                <div className='flex justify-between bg-white p-3 w-[540px] mt-3 rounded-md'>
                    <div>
                        <p className='text-lg text-semibold text-zinc-950'>Buy Rice</p>
                        <p className='text-sm text-semibold text-zinc-950'>yellow Rice with chicken devil</p>
                        <p className='text-xs text-gray-600'>15/12/2024 10.30</p>
                        <p className='text-sm text-gray-700'>Status : Active</p>
                    </div>
                    <div className='flex flex-col text-sm justify-start items-start'>
                        <button className='text-lg text-blue-600 cursor-pointer'>Edit</button>
                        <button className='text-lg text-red-600 cursor-pointer'>Delete</button>
                        <button className='text-lg text-green-600 cursor-pointer'>Completed</button>
                    </div>
                </div>
            </div>
            
        </div>

    )
}

export default Home;