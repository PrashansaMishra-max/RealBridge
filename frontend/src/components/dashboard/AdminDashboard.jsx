import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { allProblems } = useSelector(store => store.problem);
    const navigate = useNavigate();

    const openProblems = allProblems.filter(p => p.status === 'open');
    const inProgressProblems = allProblems.filter(p => p.status === 'in-progress');
    const solvedProblems = allProblems.filter(p => p.status === 'solved');

    // Category stats
    const categories = ['Technology', 'Health', 'Education', 'Agriculture', 'Environment', 'Business', 'Social', 'Other'];
    const categoryStats = categories.map(cat => ({
        name: cat,
        count: allProblems.filter(p => p.category === cat).length
    }));

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>

                {/* Welcome */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Admin <span className='text-purple-600'>Dashboard</span>
                    </h1>
                    <p className='text-gray-500 mt-1'>
                        Monitor platform activity and manage users.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-4 gap-6 mb-10'>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-purple-600'>{allProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>Total Problems</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-green-500'>{openProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>Open</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-blue-500'>{inProgressProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>In Progress</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center'>
                        <h2 className='text-4xl font-bold text-gray-500'>{solvedProblems.length}</h2>
                        <p className='text-gray-500 mt-1'>Solved</p>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>

                    {/* Category Stats */}
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                        <h2 className='text-xl font-bold mb-4'>Problems by Category</h2>
                        <div className='flex flex-col gap-3'>
                            {categoryStats.map((cat) => (
                                <div key={cat.name} className='flex items-center gap-3'>
                                    <span className='text-sm text-gray-600 w-24'>{cat.name}</span>
                                    <div className='flex-1 bg-gray-100 rounded-full h-2'>
                                        <div
                                            className='bg-purple-500 h-2 rounded-full'
                                            style={{
                                                width: allProblems.length > 0
                                                    ? `${(cat.count / allProblems.length) * 100}%`
                                                    : '0%'
                                            }}
                                        />
                                    </div>
                                    <span className='text-sm font-medium text-gray-700 w-6'>{cat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Problems */}
                    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-xl font-bold'>Recent Problems</h2>
                            <button
                                onClick={() => navigate('/problems')}
                                className='text-purple-600 hover:underline text-sm'
                            >
                                View All
                            </button>
                        </div>
                        {allProblems.length === 0 ? (
                            <p className='text-gray-400 text-sm text-center py-8'>No problems posted yet.</p>
                        ) : (
                            <div className='flex flex-col gap-3'>
                                {allProblems.slice(0, 5).map((problem) => (
                                    <div key={problem._id} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                        <div>
                                            <p className='font-medium text-sm text-gray-900'>{problem.title}</p>
                                            <p className='text-xs text-gray-400'>{problem.category}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            problem.status === 'open' ? 'bg-green-100 text-green-600' :
                                            problem.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {problem.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard