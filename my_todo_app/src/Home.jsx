import React from 'react';

const Home = ()=>{
    return(
        <div className='bg-gray-100 w-screen h-screen'>
            <div className='flex flex-col w-screen h-screen justify-center items-center'>
                <div>
                    <h1 className='font-bold text-3xl text-zinc-950	' >ToDo List</h1>
                </div>
                <div className='flex gap-3'>
                    <input className="bg-gray-100 text-zinc-950 p-2 outline-none border border-blue-300 rounded-md w-64" type="text" placeholder='Enter Task Name' />
                    <input className="bg-gray-100 text-zinc-950 p-2 outline-none border border-blue-300 rounded-md w-64" type="text" placeholder='Enter Task Description'/>
                    <button className='bg-blue-600 px-4 rounded-md text-2xl'>ADD</button>
                </div>
            </div>
        </div>
    )
}

export default Home;