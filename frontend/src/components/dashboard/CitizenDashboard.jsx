import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllProblems from "../../hooks/useGetAllProblems";

const CitizenDashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { allProblems } = useSelector(store => store.problem);
    const navigate = useNavigate();
     useGetAllProblems();

    // Filter only this user's problems
    const myProblems = allProblems.filter(
        problem => problem.postedBy?._id === user?._id
    );

    const openProblems = myProblems.filter(p => p.status === 'open');
    const inProgressProblems = myProblems.filter(p => p.status === 'in-progress');
    const solvedProblems = myProblems.filter(p => p.status === 'solved');

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>

                {/* Welcome */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Welcome back, <span className='text-purple-600'>{user?.fullname}!</span>
                    </h1>
                    <p className='text-gray-500 mt-1'>
                        Track your submitted problems and see developer solutions.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-3 gap-6 mb-10'>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-purple-600'>{myProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>Total Problems</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-green-500'>{openProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>Open</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-blue-500'>{solvedProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>Solved</p>
                    </div>
                </div>

                {/* My Problems Table */}
                <div className='bg-white border border-gray-200 rounded-xl shadow-sm'>
                    <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                        <h2 className='text-xl font-bold'>My Problems</h2>
                        <button
                            onClick={() => navigate('/post-problem')}
                            className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm'
                        >
                            + Post New Problem
                        </button>
                    </div>

                    {myProblems.length === 0 ? (
                        <div className='text-center py-16'>
                            <p className='text-gray-400 text-lg'>You haven't posted any problems yet.</p>
                            <button
                                onClick={() => navigate('/post-problem')}
                                className='mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
                            >
                                Post Your First Problem
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
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Status</th>
                                        <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myProblems.map((problem) => (
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
                                            <td className='px-6 py-4'>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    problem.status === 'open' ? 'bg-green-100 text-green-600' :
                                                    problem.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {problem.status === 'open' ? '🟢 Open' :
                                                     problem.status === 'in-progress' ? '🔵 In Progress' :
                                                     '✅ Solved'}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <button
                                                    onClick={() => navigate(`/problems/${problem._id}`)}
                                                    className='text-purple-600 hover:underline text-sm font-medium'
                                                >
                                                    View
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

export default CitizenDashboard