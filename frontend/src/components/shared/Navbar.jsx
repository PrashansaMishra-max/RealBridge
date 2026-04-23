import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                
                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-bold'>
                        Real<span className='text-purple-600'>Bridge</span>
                    </h1>
                </div>

                {/* Nav Links */}
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        <li><Link to="/" className='hover:text-purple-600'>Home</Link></li>
                        <li><Link to="/problems" className='hover:text-purple-600'>Problems</Link></li>
                        <li><Link to="/browse" className='hover:text-purple-600'>Browse</Link></li>
                    </ul>

                    {/* Auth Buttons */}
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <button className='px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50'>
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700'>
                                        Signup
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <span className='font-medium'>{user?.fullname}</span>
                                <button className='px-4 py-2 border border-red-400 text-red-400 rounded-md hover:bg-red-50'>
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar