import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '../../utils/constant'

const ProblemDetail = () => {
    const { id } = useParams();
    const { user } = useSelector(store => store.auth);
    const { allProblems } = useSelector(store => store.problem);

    const problem = allProblems.find(p => p._id === id);

    const applyHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${id}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    if (!problem) {
        return (
            <div>
                <Navbar />
                <div className='flex items-center justify-center h-96'>
                    <p className='text-gray-400 text-lg'>Problem not found!</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-10'>

                {/* Header */}
                <div className='bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            problem.status === 'open'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                            {problem.status === 'open' ? '🟢 Open' : '🔴 Closed'}
                        </span>
                        <span className='text-sm text-gray-400'>{problem.category}</span>
                    </div>

                    <h1 className='text-2xl font-bold text-gray-900 mb-3'>
                        {problem.title}
                    </h1>

                    <p className='text-gray-500 mb-6'>
                        {problem.description}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-6'>
                        {problem.tags?.map((tag, index) => (
                            <span key={index} className='px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full'>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Details Grid */}
                    <div className='grid grid-cols-2 gap-4 mb-6'>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                            <p className='text-xs text-gray-400'>Posted By</p>
                            <p className='font-medium'>👤 {problem.postedBy?.fullname || 'Anonymous'}</p>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                            <p className='text-xs text-gray-400'>Budget</p>
                            <p className='font-medium'>💰 {problem.budget ? `₹${problem.budget}` : 'Not specified'}</p>
                        </div>
                    </div>

                    {/* Apply Button */}
                    {
                        user && user.role === 'developer' && problem.status === 'open' && (
                            <button
                                onClick={applyHandler}
                                className='w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium'
                            >
                                Apply to Solve This Problem 🚀
                            </button>
                        )
                    }

                    {
                        !user && (
                            <p className='text-center text-gray-400 text-sm'>
                                <a href='/login' className='text-purple-600 font-medium'>Login</a> as a developer to apply
                            </p>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProblemDetail