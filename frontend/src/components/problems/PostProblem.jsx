import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PROBLEM_API_END_POINT } from '../../utils/constant'

const categories = [
    "Technology", "Health", "Education", "Agriculture",
    "Environment", "Business", "Social", "Other"
]

const PostProblem = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
        tags: "",
        budget: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${PROBLEM_API_END_POINT}/post`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/problems");
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
            <div className='max-w-2xl mx-auto px-4 py-10'>
                <h1 className='text-3xl font-bold mb-2'>
                    Post a <span className='text-purple-600'>Problem</span>
                </h1>
                <p className='text-gray-500 mb-8'>
                    Describe your real world problem and let developers help you solve it!
                </p>

                <form onSubmit={submitHandler} className='bg-white border border-gray-200 rounded-xl p-8 shadow-sm'>

                    {/* Title */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Problem Title</label>
                        <input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeEventHandler}
                            placeholder="e.g. Need an app to track my farm expenses"
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        />
                    </div>

                    {/* Description */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                        <textarea
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            rows={5}
                            placeholder="Explain your problem in detail..."
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500 resize-none'
                        />
                    </div>

                    {/* Category */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                        <select
                            name="category"
                            value={input.category}
                            onChange={changeEventHandler}
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Tags <span className='text-gray-400 font-normal'>(comma separated)</span>
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={input.tags}
                            onChange={changeEventHandler}
                            placeholder="e.g. mobile app, farming, finance"
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        />
                    </div>

                    {/* Budget */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Budget <span className='text-gray-400 font-normal'>(optional, in ₹)</span>
                        </label>
                        <input
                            type="text"
                            name="budget"
                            value={input.budget}
                            onChange={changeEventHandler}
                            placeholder="e.g. 5000"
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-purple-500'
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center'
                    >
                        {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting...</> : 'Post Problem'}
                    </button>

                </form>
            </div>
            <Footer />
        </div>
    )
}

export default PostProblem