import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, Zap } from 'lucide-react'
import { USER_API_END_POINT } from '../../utils/constant'

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
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
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex' style={{background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'}}>
            <div className='flex-1 flex items-center justify-center px-6 py-12'>
                <div className='w-full max-w-md'>
                    <div className='rounded-3xl p-8' style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                        <div className='text-center mb-8'>
                            <h1 className='text-3xl font-black text-white mb-2'>Welcome Back 👋</h1>
                            <p className='text-purple-300'>Enter your credentials to continue</p>
                        </div>
                        <form onSubmit={submitHandler} className='space-y-5'>
                            <div>
                                <label className='block text-sm font-semibold text-purple-200 mb-2'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className='w-full px-4 py-3 rounded-xl text-white placeholder-purple-400 outline-none'
                                    style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(168,85,247,0.3)'}}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-purple-200 mb-2'>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className='w-full px-4 py-3 rounded-xl text-white placeholder-purple-400 outline-none'
                                    style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(168,85,247,0.3)'}}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-purple-200 mb-3'>Login as</label>
                                <div className='grid grid-cols-2 gap-3'>
                                    {[
                                        { value: 'user', label: 'Problem Poster', emoji: '📋' },
                                        { value: 'developer', label: 'Developer', emoji: '💻' }
                                    ].map((role) => (
                                        <label key={role.value}
                                            className='flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all'
                                            style={{border: `1px solid ${input.role === role.value ? '#a855f7' : 'rgba(168,85,247,0.3)'}`, background: input.role === role.value ? 'rgba(168,85,247,0.2)' : 'transparent'}}
                                        >
                                            <input type="radio" name="role" value={role.value} checked={input.role === role.value} onChange={changeEventHandler} className='hidden' />
                                            <span className='text-xl'>{role.emoji}</span>
                                            <span className='text-white text-sm font-medium'>{role.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full py-3 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all'
                                style={{backgroundImage: 'linear-gradient(135deg, #a855f7, #6366f1)'}}
                            >
                                {loading ? <><Loader2 className='w-5 h-5 animate-spin' /> Please wait...</> : 'Sign In →'}
                            </button>
                            <p className='text-center text-purple-300 text-sm'>
                                Don't have an account?{' '}
                                <Link to="/signup" className='text-purple-400 font-bold hover:text-white'>
                                    Create one free
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login