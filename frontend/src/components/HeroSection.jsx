import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/problemSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/problems");
    }

    return (
        <div className='text-center py-20 px-4 bg-gradient-to-b from-purple-50 to-white'>
            <div className='flex flex-col gap-6 max-w-3xl mx-auto'>
                
                {/* Tag */}
                <span className='mx-auto px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-medium text-sm'>
                    🌉 Bridging Real Problems with Real Solutions
                </span>

                {/* Heading */}
                <h1 className='text-5xl font-bold text-gray-900'>
                    Got a Problem? <br />
                    Find a <span className='text-purple-600'>Developer</span> to Solve It!
                </h1>

                {/* Subheading */}
                <p className='text-gray-500 text-lg'>
                    RealBridge connects everyday people with talented developers and students 
                    who turn real-world problems into real solutions.
                </p>

                {/* Search Bar */}
                <div className='flex w-full max-w-xl shadow-lg border border-gray-200 rounded-full items-center gap-4 mx-auto px-4 bg-white'>
                    <input
                        type="text"
                        placeholder='Search for a problem or skill...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3 bg-transparent'
                    />
                    <button
                        onClick={searchHandler}
                        className='px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 my-1'
                    >
                        Search
                    </button>
                </div>

                {/* Stats */}
                <div className='flex items-center justify-center gap-10 mt-4'>
                    <div>
                        <h2 className='text-2xl font-bold text-purple-600'>500+</h2>
                        <p className='text-gray-500 text-sm'>Problems Posted</p>
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-purple-600'>1000+</h2>
                        <p className='text-gray-500 text-sm'>Developers</p>
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-purple-600'>300+</h2>
                        <p className='text-gray-500 text-sm'>Solutions Delivered</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeroSection