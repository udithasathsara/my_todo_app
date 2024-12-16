import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Home = ()=>{
    const [tab, setTab] = useState(1);
    const [task, setTask] = useState(null);
    const [taskDesc, setTaskDesc] = useState(null);
    const [todos, setTodos] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState('');
    const [updatedTaskDesc, setUpdatedTaskDesc] = useState('');

    const handleTabs = (tab) =>{
        setTab(tab);
    }

    const handleAddTask = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/new-task' , {task,taskDesc})
        .then(res =>{
            setTodos(res.data)
            setTask('')
            setTaskDesc(''); 
        });
    }

    useEffect(() => {
        axios.get('http://localhost:5000/read-task')
        .then(res =>{
            setTodos(res.data)
            
        })
    }, [])

    const handleEdit = (id, taskName, taskDesc ) => {
        setIsEdit(true)
        setTask(taskName)
        setTaskDesc(taskDesc)
        setUpdatedTask(taskName)
        setUpdatedTaskDesc(taskDesc)
        setUpdateId(id)

    }

    const updateTask = () => {
        axios.post('http://localhost:5000/update-task', {updateId, updatedTask, updatedTaskDesc})
        .then(res =>{
            setTodos(res.data)
            setTask('')
            setTaskDesc('')
        })

    }
    //     axios.post('http://localhost:5000/update-task', { updateId, updatedTask, updatedTaskDesc })
    //         .then(res => {
    //             setTodos(res.data); // Update todos with the new data
    //             setTask(''); // Clear inputs
    //             setTaskDesc('');
    //             setIsEdit(false); // Exit edit mode
    //         })
    //         .catch(err => console.error('Failed to update task:', err));
    // };

    const handleDelete = (id) =>{
        console.log(id);
        axios.post('http://localhost:5000/delete-task',{id})
        .then(res =>{
            setTodos(res.data)
        })
    }

    const handleComplete = (id) =>{
        axios.post('http://localhost:5000/complete-task',{id})
        .then(res =>{
            setTodos(res.data)
        })
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
                    <button className='bg-blue-600 px-4 rounded-md text-2xl'>{isEdit?<button onClick={updateTask}>Update</button>:<button onClick={handleAddTask}>Add</button>}</button>
                </div>
                <div className='text-zinc-950 flex tex-sm w-[540px]  justify-evenly mt-4'>
                    <p onClick={()=> handleTabs(1)} className={`${tab === 1 ? 'text-blue-700':'text-black'} cursor-pointer`}>All</p>
                    <p onClick={()=> handleTabs(2)} className={`${tab === 2 ? 'text-blue-700':'text-black'} cursor-pointer`}>Active</p>
                    <p onClick={()=> handleTabs(3)} className={`${tab === 3 ? 'text-blue-700':'text-black'} cursor-pointer`}>Completed</p>
                </div>
                {
                    tab == 1 && todos?.map(todo =>(
                        <div className='flex justify-between bg-white p-3 w-[540px] mt-3 rounded-md'>
                            <div>
                                <p className='text-lg text-semibold text-zinc-950'>{todo.taskName}</p>
                                <p className='text-sm text-semibold text-zinc-950'>{todo.taskDesc}</p>
                                <p className='text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-700'>Status : {todo.status}</p>
                            </div>
                            <div className='flex flex-col text-sm justify-start items-start'>
                                <button className='text-lg text-blue-600 cursor-pointer' onClick={() =>handleEdit(todo.id, todo.taskName, todo.taskDesc)}>Edit</button>
                                <button className='text-lg text-red-600 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                                <button className='text-lg text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Completed</button>
                            </div>
                        </div>
                    ))
                }
                {
                    tab == 2 && todos?.filter(todo => todo.status == 'active').map(todo =>(
                        <div className='flex justify-between bg-white p-3 w-[540px] mt-3 rounded-md'>
                            <div>
                                <p className='text-lg text-semibold text-zinc-950'>{todo.taskName}</p>
                                <p className='text-sm text-semibold text-zinc-950'>{todo.taskDesc}</p>
                                <p className='text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-700'>Status : {todo.status}</p>
                            </div>
                            <div className='flex flex-col text-sm justify-start items-start'>
                                <button className='text-lg text-blue-600 cursor-pointer' onClick={() =>handleEdit(todo.id, todo.taskName, todo.taskDesc)}>Edit</button>
                                <button className='text-lg text-red-600 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                                <button className='text-lg text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Completed</button>
                            </div>
                        </div>
                    ))
                }
                {
                    tab == 3 && todos?.filter(todo => todo.status == 'completed').map(todo =>(
                        <div className='flex justify-between bg-white p-3 w-[540px] mt-3 rounded-md'>
                            <div>
                                <p className='text-lg text-semibold text-zinc-950'>{todo.taskName}</p>
                                <p className='text-sm text-semibold text-zinc-950'>{todo.taskDesc}</p>
                                <p className='text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-700'>Status : {todo.status}</p>
                            </div>
                            <div className='flex flex-col text-sm justify-center items-center'>
                                <button className='text-lg text-red-600 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>

    )
}

export default Home;