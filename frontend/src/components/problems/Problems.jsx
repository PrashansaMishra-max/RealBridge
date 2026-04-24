import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'
import ProblemCard from './ProblemCard'

const Problems = () => {
    const { allProblems } = useSelector(store => store.problem);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>
                <h1 className='text-3xl font-bold mb-2'>
                    Real World <span className='text-purple-600'>Problems</span>
                </h1>
                <p className='text-gray-500 mb-8'>
                    Browse problems posted by real people. Pick one and start building!
                </p>

                {/* Problems Grid */}
                {
                    allProblems.length === 0 ? (
                        <div className='text-center py-20'>
                            <p className='text-gray-400 text-lg'>No problems posted yet. Be the first!</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                allProblems.map((problem) => (
                                    <ProblemCard key={problem._id} problem={problem} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default Problems