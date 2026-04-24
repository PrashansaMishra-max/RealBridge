import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white mt-20'>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                <div className='grid grid-cols-3 gap-8'>
                    
                    {/* Brand */}
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Real<span className='text-purple-400'>Bridge</span>
                        </h1>
                        <p className='text-gray-400 mt-3 text-sm'>
                            Connecting real-world problems with developer solutions. 
                            Building a better tomorrow, together.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className='font-semibold text-lg mb-4'>Quick Links</h2>
                        <ul className='flex flex-col gap-2 text-gray-400 text-sm'>
                            <li><Link to="/" className='hover:text-purple-400'>Home</Link></li>
                            <li><Link to="/problems" className='hover:text-purple-400'>Browse Problems</Link></li>
                            <li><Link to="/signup" className='hover:text-purple-400'>Join as Developer</Link></li>
                            <li><Link to="/signup" className='hover:text-purple-400'>Post a Problem</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className='font-semibold text-lg mb-4'>Contact</h2>
                        <ul className='flex flex-col gap-2 text-gray-400 text-sm'>
                            <li>📧 support@realbridge.com</li>
                            <li>🌐 www.realbridge.com</li>
                            <li>📍 India</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className='border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm'>
                    <p>© 2024 RealBridge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer