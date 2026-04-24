import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../../utils/constant'
import { LogOut, User } from 'lucide-react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

                {/* Logo */}
                <Link to="/">
                    <h1 className='text-2xl font-bold'>
                        Real<span className='text-purple-600'>Bridge</span>
                    </h1>
                </Link>

                {/* Nav Links */}
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        <li><Link to="/" className='hover:text-purple-600'>Home</Link></li>
                        <li><Link to="/problems" className='hover:text-purple-600'>Problems</Link></li>
                        {
                            user && user.role === 'user' && (
                                <li><Link to="/post-problem" className='hover:text-purple-600'>Post Problem</Link></li>
                            )
                        }
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
                            <div className='flex items-center gap-4'>
                                <Link to="/profile" className='flex items-center gap-2 hover:text-purple-600'>
                                    <div className='w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center'>
                                        {user?.profile?.profilePhoto ? (
                                            <img src={user.profile.profilePhoto} alt="profile" className='w-full h-full rounded-full object-cover' />
                                        ) : (
                                            <User className='w-4 h-4 text-purple-600' />
                                        )}
                                    </div>
                                    <span className='font-medium text-sm'>{user?.fullname}</span>
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className='flex items-center gap-1 px-4 py-2 border border-red-400 text-red-400 rounded-md hover:bg-red-50'
                                >
                                    <LogOut className='w-4 h-4' />
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