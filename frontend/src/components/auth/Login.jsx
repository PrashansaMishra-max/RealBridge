import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser, setLoading } from '../../redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoadingState] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingState(true);
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoadingState(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto mt-10'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-lg'>
                    <h1 className='font-bold text-2xl mb-6 text-center'>Welcome Back 👋</h1>

                    {/* Email */}
                    <div className='my-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        />
                    </div>

                    {/* Password */}
                    <div className='my-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        />
                    </div>

                    {/* Role */}
                    <div className='my-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Login as</label>
                        <div className='flex items-center gap-6'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={input.role === 'user'}
                                    onChange={changeEventHandler}
                                    className='accent-purple-600'
                                />
                                <span>Problem Poster</span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type="radio"
                                    name="role"
                                    value="developer"
                                    checked={input.role === 'developer'}
                                    onChange={changeEventHandler}
                                    className='accent-purple-600'
                                />
                                <span>Developer</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 mt-4 flex items-center justify-center'
                    >
                        {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</> : 'Login'}
                    </button>

                    <p className='text-sm text-center mt-4'>
                        Don't have an account? <Link to="/signup" className='text-purple-600 font-medium'>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login