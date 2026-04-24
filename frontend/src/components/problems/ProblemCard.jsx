import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProblemCard = ({ problem }) => {
    const navigate = useNavigate();

    return (
        <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer'
            onClick={() => navigate(`/problems/${problem._id}`)}
        >
            {/* Header */}
            <div className='flex items-center justify-between mb-3'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    problem.status === 'open' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                    {problem.status === 'open' ? '🟢 Open' : '🔴 Closed'}
                </span>
                <span className='text-xs text-gray-400'>
                    {problem.category}
                </span>
            </div>

            {/* Title */}
            <h2 className='font-bold text-lg text-gray-900 mb-2 line-clamp-2'>
                {problem.title}
            </h2>

            {/* Description */}
            <p className='text-gray-500 text-sm mb-4 line-clamp-3'>
                {problem.description}
            </p>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-4'>
                {problem.tags?.slice(0, 3).map((tag, index) => (
                    <span key={index} className='px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md'>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>
                    👤 {problem.postedBy?.fullname || 'Anonymous'}
                </span>
                <button className='px-4 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700'>
                    View Problem
                </button>
            </div>
        </div>
    )
}

export default ProblemCard