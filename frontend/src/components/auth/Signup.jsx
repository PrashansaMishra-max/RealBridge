import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

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
        if (input.file) {
            formData.append("file", input.file);
        }
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
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto mt-10'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-lg'>
                    <h1 className='font-bold text-2xl mb-6 text-center'>Create Account 🚀</h1>

                    {/* Full Name */}
                    <div className='my-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Your full name"
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        />
                    </div>

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

                    {/* Phone */}
                    <div className='my-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="9876543210"
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
                        <label className='block text-sm font-medium text-gray-700 mb-2'>I am a</label>
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

                    {/* Profile Photo */}
                    <div className='my-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 mt-4 flex items-center justify-center'
                    >
                        {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</> : 'Create Account'}
                    </button>

                    <p className='text-sm text-center mt-4'>
                        Already have an account? <Link to="/login" className='text-purple-600 font-medium'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup