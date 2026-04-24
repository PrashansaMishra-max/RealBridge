import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { Mail, Phone, User } from 'lucide-react'

const Profile = () => {
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-10'>

                {/* Profile Card */}
                <div className='bg-white border border-gray-200 rounded-xl p-8 shadow-sm'>
                    <div className='flex items-center gap-6'>

                        {/* Avatar */}
                        <div className='w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden'>
                            {user?.profile?.profilePhoto ? (
                                <img
                                    src={user.profile.profilePhoto}
                                    alt="profile"
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <User className='w-12 h-12 text-purple-400' />
                            )}
                        </div>

                        {/* Info */}
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>{user?.fullname}</h1>
                            <p className='text-gray-500 mt-1'>{user?.profile?.bio || "No bio added yet"}</p>
                            <span className='mt-2 inline-block px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full font-medium'>
                                {user?.role === 'developer' ? '👨‍💻 Developer' : '📋 Problem Poster'}
                            </span>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className='mt-8 grid grid-cols-2 gap-4'>
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Mail className='text-purple-600 w-5 h-5' />
                            <div>
                                <p className='text-xs text-gray-400'>Email</p>
                                <p className='text-sm font-medium'>{user?.email}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Phone className='text-purple-600 w-5 h-5' />
                            <div>
                                <p className='text-xs text-gray-400'>Phone</p>
                                <p className='text-sm font-medium'>{user?.phoneNumber || "Not added"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills - only for developers */}
                    {user?.role === 'developer' && (
                        <div className='mt-6'>
                            <h2 className='font-semibold text-gray-700 mb-3'>Skills</h2>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills?.length > 0 ? (
                                    user.profile.skills.map((skill, index) => (
                                        <span key={index} className='px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full'>
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className='text-gray-400 text-sm'>No skills added yet</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile