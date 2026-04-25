import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../../utils/constant'
import { LogOut, User, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const dashboardRoute = user?.role === 'admin' 
    ? '/dashboard/admin' 
    : user?.role === 'developer' 
    ? '/dashboard/developer' 
    : '/dashboard/citizen';

    return (
        <nav style={{
            background: 'rgba(15,13,30,0.85)',
            borderBottom: '1px solid rgba(139,92,246,0.2)',
            backdropFilter: 'blur(20px)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>

                {/* Logo */}
                <Link to="/" className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-lg flex items-center justify-center text-lg'
                        style={{background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)'}}>
                        🌉
                    </div>
                    <h1 className='text-xl font-black text-white'>
                        Real<span style={{
                            backgroundImage: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Bridge</span>
                    </h1>
                </Link>

                {/* Nav Links */}
                <div className='flex items-center gap-6'>
                    <Link to="/" className='text-sm font-medium transition-all hover:text-white'
                        style={{color: 'rgba(196,181,253,0.8)'}}>Home</Link>
                    <Link to="/problems" className='text-sm font-medium transition-all hover:text-white'
                        style={{color: 'rgba(196,181,253,0.8)'}}>Problems</Link>
                    {user?.role === 'user' && (
                        <Link to="/post-problem" className='text-sm font-medium transition-all hover:text-white'
                            style={{color: 'rgba(196,181,253,0.8)'}}>Post Problem</Link>
                    )}
                    {user && (
    <Link to={dashboardRoute}
        className='flex items-center gap-1 text-sm font-medium transition-all hover:text-white'
        style={{color: 'rgba(196,181,253,0.8)'}}>
        <LayoutDashboard className='w-4 h-4'/>
        Dashboard
    </Link>
)}
{user?.role === 'admin' && (
    <Link to="/dashboard/admin"
        className='flex items-center gap-1 text-sm font-medium transition-all hover:text-white px-3 py-1 rounded-lg'
        style={{color: '#fbbf24', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)'}}>
        👑 Admin
    </Link>
)}
                        </Link>
                    )}
                </div>

                {/* Auth */}
                <div className='flex items-center gap-3'>
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button className='px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:text-white'
                                    style={{color: 'rgba(196,181,253,0.8)', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)'}}>
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className='px-4 py-2 text-sm font-bold rounded-lg text-white transition-all hover:opacity-90'
                                    style={{background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)'}}>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link to="/profile" className='flex items-center gap-2'>
                                <div className='w-8 h-8 rounded-full overflow-hidden flex items-center justify-center'
                                    style={{background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)'}}>
                                    {user?.profile?.profilePhoto
                                        ? <img src={user.profile.profilePhoto} alt="profile" className='w-full h-full object-cover'/>
                                        : <User className='w-4 h-4 text-white'/>
                                    }
                                </div>
                                <span className='text-sm font-medium text-white'>{user?.fullname}</span>
                            </Link>
                            <button onClick={logoutHandler}
                                className='flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all'
                                style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5'}}>
                                <LogOut className='w-4 h-4'/>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar