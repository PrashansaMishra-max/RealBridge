import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DeveloperDashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { allProblems } = useSelector(store => store.problem);
    const navigate = useNavigate();

    // Recommended problems based on open status
    const recommendedProblems = allProblems.filter(p => p.status === 'open').slice(0, 6);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>

                {/* Welcome */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Welcome, <span className='text-purple-600'>{user?.fullname}!</span>
                    </h1>
                    <p className='text-gray-500 mt-1'>
                        Find real-world problems to solve and build your portfolio.
                    </p>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-3 gap-6 mb-10'>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-purple-600'>
                            {allProblems.filter(p => p.status === 'open').length}
                        </h2>
                        <p className='text-gray-500 mt-1'>Open Problems</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-green-500'>
                            {user?.profile?.skills?.length || 0}
                        </h2>
                        <p className='text-gray-500 mt-1'>Your Skills</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-blue-500'>0</h2>
                        <p className='text-gray-500 mt-1'>Problems Solved</p>
                    </div>
                </div>

                {/* Skills Section */}
                <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-xl font-bold'>Your Skills</h2>
                        <button
                            onClick={() => navigate('/profile')}
                            className='text-purple-600 hover:underline text-sm font-medium'
                        >
                            Update Skills
                        </button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((skill, index) => (
                                <span key={index} className='px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full'>
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className='text-gray-400 text-sm'>
                                No skills added yet.
                                <button onClick={() => navigate('/profile')} className='text-purple-600 ml-1 hover:underline'>
                                    Add skills to get better recommendations!
                                </button>
                            </p>
                        )}
                    </div>
                </div>

                {/* Recommended Problems */}
                <div className='bg-white border border-gray-200 rounded-xl shadow-sm'>
                    <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-bold'>🎯 Recommended Problems</h2>
                        <button
                            onClick={() => navigate('/problems')}
                            className='text-purple-600 hover:underline text-sm font-medium'
                        >
                            View All
                        </button>
                    </div>

                    {recommendedProblems.length === 0 ? (
                        <div className='text-center py-16'>
                            <p className='text-gray-400 text-lg'>No open problems available right now.</p>
                            <button
                                onClick={() => navigate('/problems')}
                                className='mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
                            >
                                Browse All Problems
                            </button>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Problem</th>
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Category</th>
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Priority</th>
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Budget</th>
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recommendedProblems.map((problem) => (
                                        <tr key={problem._id} className='border-t border-gray-100 hover:bg-gray-50'>
                                            <td className='px-6 py-4'>
                                                <p className='font-medium text-gray-900'>{problem.title}</p>
                                                <p className='text-sm text-gray-400 truncate max-w-xs'>{problem.description}</p>
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray-600'>{problem.category}</td>
                                            <td className='px-6 py-4'>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    problem.priority === 'high' ? 'bg-red-100 text-red-600' :
                                                    problem.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-green-100 text-green-600'
                                                }`}>
                                                    {problem.priority || 'low'}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray-600'>
                                                {problem.budget ? `₹${problem.budget}` : 'Open'}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <button
                                                    onClick={() => navigate(`/problems/${problem._id}`)}
                                                    className='px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700'
                                                >
                                                    Apply
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DeveloperDashboard