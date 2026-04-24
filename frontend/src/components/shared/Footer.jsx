import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(165,180,252,0.15)'}}>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                <div className='grid grid-cols-3 gap-8'>

                    {/* Brand */}
                    <div>
                        <h1 className='text-2xl font-black text-white mb-3'>
                            Real<span style={{color: '#a5b4fc'}}>Bridge</span>
                        </h1>
                        <p className='text-sm leading-relaxed' style={{color: 'rgba(165,180,252,0.6)'}}>
                            Connecting real-world problems with developer solutions.
                            Building a better tomorrow, together.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className='font-bold text-white mb-4'>Quick Links</h2>
                        <ul className='flex flex-col gap-2 text-sm' style={{color: 'rgba(165,180,252,0.6)'}}>
                            <li><Link to="/" className='hover:text-white transition-colors'>Home</Link></li>
                            <li><Link to="/problems" className='hover:text-white transition-colors'>Browse Problems</Link></li>
                            <li><Link to="/signup" className='hover:text-white transition-colors'>Join as Developer</Link></li>
                            <li><Link to="/post-problem" className='hover:text-white transition-colors'>Post a Problem</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className='font-bold text-white mb-4'>Contact</h2>
                        <ul className='flex flex-col gap-2 text-sm' style={{color: 'rgba(165,180,252,0.6)'}}>
                            <li>📧 support@realbridge.com</li>
                            <li>🌐 www.realbridge.com</li>
                            <li>📍 India</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className='mt-10 pt-6 text-center text-sm' style={{borderTop: '1px solid rgba(165,180,252,0.1)', color: 'rgba(165,180,252,0.4)'}}>
                    <p>© 2024 RealBridge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer