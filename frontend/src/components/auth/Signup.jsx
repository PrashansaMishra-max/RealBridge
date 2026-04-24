import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, Phone, User } from 'lucide-react'
import { USER_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='page-wrapper'>
            <Navbar />
            <div className='flex items-center justify-center px-4 py-16'>
                <div className='w-full max-w-md'>
                    <div className='purple-card p-8'>

                        {/* Header */}
                        <div className='text-center mb-8'>
                            <h2 className='text-3xl font-black text-white mb-2'>Create Account 🚀</h2>
                            <p style={{color: 'rgba(165,180,252,0.7)'}}>Join RealBridge and start making an impact</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-5'>

                            {/* Full Name */}
                            <div>
                                <label className='block text-sm font-semibold mb-2' style={{color: '#a5b4fc'}}>Full Name</label>
                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5' style={{color: 'rgba(165,180,252,0.6)'}}/>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        placeholder="Your full name"
                                        className='purple-input w-full pl-12 pr-4 py-3'
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className='block text-sm font-semibold mb-2' style={{color: '#a5b4fc'}}>Email Address</label>
                                <div className='relative'>
                                    <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5' style={{color: 'rgba(165,180,252,0.6)'}}/>
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className='purple-input w-full pl-12 pr-4 py-3'
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className='block text-sm font-semibold mb-2' style={{color: '#a5b4fc'}}>Phone Number</label>
                                <div className='relative'>
                                    <Phone className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5' style={{color: 'rgba(165,180,252,0.6)'}}/>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        placeholder="9876543210"
                                        className='purple-input w-full pl-12 pr-4 py-3'
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className='block text-sm font-semibold mb-2' style={{color: '#a5b4fc'}}>Password</label>
                                <div className='relative'>
                                    <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5' style={{color: 'rgba(165,180,252,0.6)'}}/>
                                    <input
                                        type="password"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className='purple-input w-full pl-12 pr-4 py-3'
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className='block text-sm font-semibold mb-3' style={{color: '#a5b4fc'}}>I am a</label>
                                <div className='grid grid-cols-2 gap-3'>
                                    {[
                                        { value: 'user', label: 'Problem Poster', emoji: '📋' },
                                        { value: 'developer', label: 'Developer', emoji: '💻' }
                                    ].map((role) => (
                                        <label key={role.value}
                                            className='flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all'
                                            style={{
                                                border: `1px solid ${input.role === role.value ? '#a5b4fc' : 'rgba(165,180,252,0.2)'}`,
                                                background: input.role === role.value ? 'rgba(165,180,252,0.15)' : 'transparent'
                                            }}>
                                            <input type="radio" name="role" value={role.value} checked={input.role === role.value} onChange={changeEventHandler} className='hidden'/>
                                            <span className='text-xl'>{role.emoji}</span>
                                            <span className='text-white text-sm font-medium'>{role.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Photo */}
                            <div>
                                <label className='block text-sm font-semibold mb-2' style={{color: '#a5b4fc'}}>Profile Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className='w-full py-3 px-4 rounded-xl text-indigo-200 cursor-pointer'
                                    style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(165,180,252,0.2)'}}
                                />
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={loading}
                                className='w-full py-3 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all'
                                style={{backgroundImage: 'linear-gradient(135deg, #6366f1, #4338ca)'}}>
                                {loading ? <><Loader2 className='w-5 h-5 animate-spin'/> Please wait...</> : 'Create Account →'}
                            </button>

                            <p className='text-center text-sm' style={{color: 'rgba(165,180,252,0.7)'}}>
                                Already have an account?{' '}
                                <Link to="/login" className='font-bold hover:text-white transition-colors' style={{color: '#a5b4fc'}}>
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup