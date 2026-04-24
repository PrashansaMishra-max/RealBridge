import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/problemSlice'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Play, Zap, Star } from 'lucide-react'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/problems");
    }

    return (
        <div>
            {/* HERO */}
            <div className='relative overflow-hidden section-darker' style={{minHeight: '100vh'}}>

                {/* Neon glow orbs */}
                <div className='glow-anim absolute pointer-events-none'
                    style={{top: '-100px', right: '-100px', width: '600px', height: '600px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)'}}/>
                <div className='glow-anim absolute pointer-events-none'
                    style={{bottom: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(40px)'}}/>
                <div className='absolute pointer-events-none'
                    style={{top: '40%', left: '40%', width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', filter: 'blur(60px)'}}/>

                {/* Grid pattern */}
                <div className='absolute inset-0 pointer-events-none' style={{
                    backgroundImage: 'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}/>

                <div className='relative max-w-7xl mx-auto px-6' style={{paddingTop: '120px', paddingBottom: '80px'}}>
                    <div className='grid grid-cols-2 gap-12 items-center'>

                        {/* Left Content */}
                        <div className='slide-in'>
                            {/* Badge */}
                            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6'
                                style={{background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)'}}>
                                <Zap className='w-4 h-4' style={{color: '#f59e0b'}}/>
                                <span className='text-sm font-semibold' style={{color: '#c4b5fd'}}>
                                    India's #1 Problem-Developer Platform
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className='font-black leading-none mb-6' style={{fontSize: '64px'}}>
                                <span className='text-white'>Real</span>
                                <br/>
                                <span className='gradient-text'>Problems</span>
                                <br/>
                                <span className='text-white'>Meet </span>
                                <span style={{backgroundImage: 'linear-gradient(90deg, #06b6d4, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                    Developers
                                </span>
                            </h1>

                            <p className='text-lg mb-8 leading-relaxed' style={{color: 'rgba(196,181,253,0.7)', maxWidth: '480px'}}>
                                A community-driven platform connecting everyday people who have
                                <span style={{color: '#f59e0b'}}> real problems </span>
                                with developers who build
                                <span style={{color: '#06b6d4'}}> real solutions</span>.
                            </p>

                            {/* Search */}
                            <div className='flex items-center rounded-xl overflow-hidden mb-8'
                                style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.3)', maxWidth: '500px'}}>
                                <Search className='w-5 h-5 ml-4' style={{color: '#8b5cf6'}}/>
                                <input type="text"
                                    placeholder='Search problems or skills...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                                    className='outline-none border-none w-full py-4 px-3 bg-transparent text-white'
                                    style={{'--placeholder-color': 'rgba(139,92,246,0.5)'}}
                                />
                                <button onClick={searchHandler}
                                    className='neon-btn px-5 py-3 m-1 rounded-lg flex items-center gap-2 text-sm'>
                                    Search <ArrowRight className='w-4 h-4'/>
                                </button>
                            </div>

                            {/* Buttons */}
                            <div className='flex items-center gap-4 mb-12'>
                                <button onClick={() => navigate('/signup')}
                                    className='neon-btn px-8 py-4 rounded-xl text-base'>
                                    🚀 Get Started Free
                                </button>
                                <button onClick={() => navigate('/problems')}
                                    className='flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all hover:bg-white hover:bg-opacity-5'
                                    style={{color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)'}}>
                                    <div className='w-8 h-8 rounded-full flex items-center justify-center'
                                        style={{background: 'rgba(139,92,246,0.2)'}}>
                                        <Play className='w-3 h-3 text-white' style={{marginLeft: '2px'}}/>
                                    </div>
                                    Browse Problems
                                </button>
                            </div>

                            {/* Stats */}
                            <div className='flex items-center gap-8'>
                                {[
                                    { value: '500+', label: 'Problems', color: '#8b5cf6' },
                                    { value: '1.2K+', label: 'Developers', color: '#06b6d4' },
                                    { value: '300+', label: 'Solved', color: '#10b981' },
                                ].map(stat => (
                                    <div key={stat.label}>
                                        <h3 className='text-2xl font-black' style={{color: stat.color}}>{stat.value}</h3>
                                        <p className='text-xs' style={{color: 'rgba(196,181,253,0.5)'}}>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Floating Cards */}
                        <div className='relative' style={{height: '600px'}}>

                            {/* Citizen Problem Card 1 */}
                            <div className='float absolute neon-card p-5' style={{top: '20px', left: '0', width: '280px'}}>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-10 h-10 rounded-full flex items-center justify-center text-xl'
                                        style={{background: 'linear-gradient(135deg, #f59e0b, #ef4444)'}}>
                                        👨‍🌾
                                    </div>
                                    <div>
                                        <p className='text-white font-bold text-sm'>Ramesh Kumar</p>
                                        <p className='text-xs' style={{color: 'rgba(196,181,253,0.5)'}}>Farmer, Uttar Pradesh</p>
                                    </div>
                                    <span className='ml-auto px-2 py-1 rounded-full text-xs font-bold'
                                        style={{background: 'rgba(34,197,94,0.2)', color: '#4ade80'}}>
                                        🟢 Open
                                    </span>
                                </div>
                                <p className='text-sm mb-3' style={{color: 'rgba(255,255,255,0.8)'}}>
                                    "Need a mobile app to track crop expenses and get weather alerts for my 5-acre farm"
                                </p>
                                <div className='flex gap-2'>
                                    {['Mobile App', 'Agriculture'].map(tag => (
                                        <span key={tag} className='px-2 py-1 rounded-full text-xs'
                                            style={{background: 'rgba(139,92,246,0.2)', color: '#c4b5fd'}}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Developer Card */}
                            <div className='float2 absolute cyan-card p-5' style={{top: '10px', right: '0', width: '260px'}}>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-10 h-10 rounded-full flex items-center justify-center text-xl'
                                        style={{background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)'}}>
                                        👩‍💻
                                    </div>
                                    <div>
                                        <p className='text-white font-bold text-sm'>Ananya Singh</p>
                                        <p className='text-xs' style={{color: 'rgba(196,181,253,0.5)'}}>React Developer</p>
                                    </div>
                                </div>
                                <div className='p-3 rounded-xl mb-3'
                                    style={{background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)'}}>
                                    <p className='text-xs' style={{color: '#67e8f9'}}>✅ Currently solving:</p>
                                    <p className='text-sm text-white mt-1'>Crop tracking app for Ramesh</p>
                                </div>
                                <div className='flex gap-2'>
                                    {['React', 'Node.js', 'MongoDB'].map(skill => (
                                        <span key={skill} className='px-2 py-1 rounded-full text-xs'
                                            style={{background: 'rgba(6,182,212,0.15)', color: '#67e8f9'}}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Problem Card 2 */}
                            <div className='float3 absolute neon-card p-5' style={{top: '200px', left: '20px', width: '270px'}}>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-10 h-10 rounded-full flex items-center justify-center text-xl'
                                        style={{background: 'linear-gradient(135deg, #ec4899, #8b5cf6)'}}>
                                        🏪
                                    </div>
                                    <div>
                                        <p className='text-white font-bold text-sm'>Priya Sharma</p>
                                        <p className='text-xs' style={{color: 'rgba(196,181,253,0.5)'}}>Shop Owner, Delhi</p>
                                    </div>
                                </div>
                                <p className='text-sm' style={{color: 'rgba(255,255,255,0.8)'}}>
                                    "Simple billing system for my small grocery store with GST support"
                                </p>
                            </div>

                            {/* Solution delivered card */}
                            <div className='float absolute p-4 rounded-2xl' style={{
                                bottom: '120px', right: '10px', width: '250px',
                                background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))',
                                border: '1px solid rgba(16,185,129,0.3)'
                            }}>
                                <div className='flex items-center gap-2 mb-2'>
                                    <span className='text-2xl'>🎉</span>
                                    <p className='text-white font-bold text-sm'>Solution Delivered!</p>
                                </div>
                                <p className='text-xs' style={{color: 'rgba(196,181,253,0.7)'}}>
                                    Patient booking system for Dr. Mehta's clinic — built in 3 weeks!
                                </p>
                                <div className='flex items-center gap-1 mt-2'>
                                    {[1,2,3,4,5].map(s => <Star key={s} className='w-3 h-3' style={{color: '#f59e0b', fill: '#f59e0b'}}/>)}
                                    <span className='text-xs ml-1' style={{color: '#f59e0b'}}>5.0</span>
                                </div>
                            </div>

                            {/* Healthcare problem card */}
                            <div className='float2 absolute neon-card p-4' style={{bottom: '20px', left: '30px', width: '260px'}}>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full flex items-center justify-center text-xl'
                                        style={{background: 'linear-gradient(135deg, #ef4444, #f97316)'}}>
                                        🏥
                                    </div>
                                    <div>
                                        <p className='text-white font-bold text-sm'>Dr. Mehta</p>
                                        <p className='text-xs mb-1' style={{color: 'rgba(196,181,253,0.5)'}}>Rural Clinic, Gujarat</p>
                                        <p className='text-xs' style={{color: 'rgba(255,255,255,0.7)'}}>Patient appointment system needed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Connecting line animation */}
                            <svg className='absolute inset-0 w-full h-full pointer-events-none' style={{opacity: 0.3}}>
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#8b5cf6"/>
                                        <stop offset="100%" stopColor="#06b6d4"/>
                                    </linearGradient>
                                </defs>
                                <path d="M 140 80 Q 300 150 220 240" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" strokeDasharray="5,5"/>
                                <path d="M 270 220 Q 350 300 260 380" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" strokeDasharray="5,5"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className='py-24 section-dark'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='text-center mb-16'>
                        <span className='px-4 py-2 rounded-full text-sm font-bold'
                            style={{background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd'}}>
                            ⚡ How It Works
                        </span>
                        <h2 className='text-4xl font-black text-white mt-4 mb-4'>
                            Three Steps to <span className='gradient-text'>Real Impact</span>
                        </h2>
                        <p style={{color: 'rgba(196,181,253,0.6)'}}>Simple, fast and effective</p>
                    </div>
                    <div className='grid grid-cols-3 gap-8'>
                        {[
                            { step: '01', icon: '📝', title: 'Post Your Problem', desc: 'Describe your real-world challenge in simple words. No technical knowledge needed. Anyone can post!', color: '#8b5cf6', border: 'rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.08)' },
                            { step: '02', icon: '🔗', title: 'Get Matched', desc: 'Our smart system connects your problem with the right developer or student based on skills.', color: '#06b6d4', border: 'rgba(6,182,212,0.3)', bg: 'rgba(6,182,212,0.08)' },
                            { step: '03', icon: '🚀', title: 'Receive Solution', desc: 'Track progress in real-time, collaborate with your developer and get a working solution!', color: '#10b981', border: 'rgba(16,185,129,0.3)', bg: 'rgba(16,185,129,0.08)' },
                        ].map((item, i) => (
                            <div key={item.step} className='rounded-3xl p-8 transition-all hover:-translate-y-2'
                                style={{background: item.bg, border: `1px solid ${item.border}`}}>
                                <div className='text-4xl mb-4'>{item.icon}</div>
                                <div className='text-6xl font-black mb-4' style={{color: `${item.color}20`}}>{item.step}</div>
                                <h3 className='text-xl font-black text-white mb-3'>{item.title}</h3>
                                <p style={{color: 'rgba(196,181,253,0.6)', lineHeight: '1.7'}}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* REAL WORLD PROBLEMS SHOWCASE */}
            <div className='py-24' style={{background: '#080615'}}>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='text-center mb-16'>
                        <span className='px-4 py-2 rounded-full text-sm font-bold'
                            style={{background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#67e8f9'}}>
                            🌍 Real World Impact
                        </span>
                        <h2 className='text-4xl font-black text-white mt-4 mb-4'>
                            Problems from <span style={{backgroundImage: 'linear-gradient(90deg, #06b6d4, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Real People</span>
                        </h2>
                        <p style={{color: 'rgba(196,181,253,0.6)'}}>Every problem here is from a real person with a real need</p>
                    </div>
                    <div className='grid grid-cols-3 gap-6'>
                        {[
                            { emoji: '🌾', title: 'Smart Farming App', person: 'Ramesh, UP Farmer', desc: 'Track crop expenses, get weather alerts, and manage farm operations from mobile', tags: ['Agriculture', 'Mobile'], color: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', status: 'In Progress', statusColor: '#06b6d4' },
                            { emoji: '🏥', title: 'Rural Clinic System', person: 'Dr. Mehta, Gujarat', desc: 'Digital patient records and appointment booking for a small rural healthcare clinic', tags: ['Healthcare', 'Web App'], color: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', status: 'Solved ✅', statusColor: '#10b981' },
                            { emoji: '📚', title: 'Village School Portal', person: 'Teacher Radha, Bihar', desc: 'Simple portal for students and parents to access homework, results and school notices', tags: ['Education', 'Portal'], color: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', status: 'Open', statusColor: '#8b5cf6' },
                            { emoji: '🏪', title: 'GST Billing System', person: 'Priya, Shop Owner Delhi', desc: 'Easy to use billing software with GST calculations for a small grocery store', tags: ['Business', 'Software'], color: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.3)', status: 'Open', statusColor: '#8b5cf6' },
                            { emoji: '🚰', title: 'Water Supply Tracker', person: 'Panchayat, Rajasthan', desc: 'Track water supply schedules and complaints for a village water management system', tags: ['Government', 'Civic'], color: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', status: 'In Progress', statusColor: '#06b6d4' },
                            { emoji: '🛺', title: 'Auto Booking App', person: 'Suresh, Auto Driver', desc: 'Simple booking app for local auto-rickshaw drivers to get ride requests in their area', tags: ['Transport', 'Mobile'], color: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', status: 'Open', statusColor: '#8b5cf6' },
                        ].map((item, i) => (
                            <div key={i} className='rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer'
                                style={{background: item.color, border: `1px solid ${item.border}`}}
                                onClick={() => navigate('/problems')}>
                                <div className='flex items-start justify-between mb-4'>
                                    <span className='text-3xl'>{item.emoji}</span>
                                    <span className='px-3 py-1 rounded-full text-xs font-bold'
                                        style={{background: `${item.statusColor}20`, color: item.statusColor}}>
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className='text-white font-bold text-lg mb-1'>{item.title}</h3>
                                <p className='text-xs mb-3' style={{color: 'rgba(196,181,253,0.5)'}}>👤 {item.person}</p>
                                <p className='text-sm mb-4' style={{color: 'rgba(255,255,255,0.7)', lineHeight: '1.6'}}>{item.desc}</p>
                                <div className='flex gap-2 flex-wrap'>
                                    {item.tags.map(tag => (
                                        <span key={tag} className='px-2 py-1 rounded-full text-xs'
                                            style={{background: 'rgba(255,255,255,0.08)', color: 'rgba(196,181,253,0.8)'}}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='text-center mt-10'>
                        <button onClick={() => navigate('/problems')}
                            className='neon-btn px-8 py-4 rounded-xl text-base'>
                            View All Problems →
                        </button>
                    </div>
                </div>
            </div>

            {/* CATEGORIES */}
            <div className='py-24 section-dark'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-black text-white mb-4'>
                            Explore <span className='gradient-text'>Categories</span>
                        </h2>
                        <p style={{color: 'rgba(196,181,253,0.6)'}}>Find problems in your domain of expertise</p>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {[
                            { name: 'Agriculture', emoji: '🌾', color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
                            { name: 'Healthcare', emoji: '🏥', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' },
                            { name: 'Education', emoji: '📚', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)' },
                            { name: 'Environment', emoji: '🌍', color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.25)' },
                            { name: 'Technology', emoji: '💻', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)' },
                            { name: 'Business', emoji: '💼', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
                            { name: 'Social', emoji: '🤝', color: '#ec4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.25)' },
                            { name: 'Other', emoji: '✨', color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.25)' },
                        ].map(cat => (
                            <button key={cat.name}
                                onClick={() => { dispatch(setSearchedQuery(cat.name)); navigate("/problems"); }}
                                className='rounded-2xl p-6 text-center transition-all hover:scale-105 hover:-translate-y-1'
                                style={{background: cat.bg, border: `1px solid ${cat.border}`}}>
                                <div className='text-4xl mb-3'>{cat.emoji}</div>
                                <p className='font-bold text-white'>{cat.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* WHY REALBRIDGE */}
            <div className='py-24' style={{background: '#080615'}}>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-black text-white mb-4'>
                            Why <span className='gradient-text'>RealBridge?</span>
                        </h2>
                        <p style={{color: 'rgba(196,181,253,0.6)'}}>We're different from every other platform</p>
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        {[
                            { icon: '🚀', title: 'Real World Experience', desc: 'Developers get actual projects — not todo apps. Build a portfolio that actually impresses employers.', color: '#8b5cf6' },
                            { icon: '🌉', title: 'Bridge The Gap', desc: 'Common people finally have a platform to bring their problems to talented technical minds.', color: '#06b6d4' },
                            { icon: '🏆', title: 'Build Your Portfolio', desc: 'Every solution becomes a verified, real-world portfolio piece you can showcase anywhere.', color: '#f59e0b' },
                            { icon: '🤝', title: 'Community Driven', desc: 'A growing community of 1200+ developers and problem solvers working together for India.', color: '#10b981' },
                        ].map(item => (
                            <div key={item.title} className='glass-card p-8 transition-all hover:-translate-y-1'
                                style={{borderColor: `${item.color}30`}}>
                                <div className='text-4xl mb-4'>{item.icon}</div>
                                <h3 className='text-xl font-black text-white mb-3'>{item.title}</h3>
                                <p style={{color: 'rgba(196,181,253,0.6)', lineHeight: '1.7'}}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className='py-24 section-dark'>
                <div className='max-w-5xl mx-auto px-6'>
                    <div className='rounded-3xl p-16 text-center relative overflow-hidden'
                        style={{background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))', border: '1px solid rgba(139,92,246,0.3)'}}>
                        <div className='absolute inset-0 pointer-events-none'
                            style={{background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)'}}/>
                        <h2 className='text-5xl font-black text-white mb-4 relative'>
                            Ready to Make a <span className='gradient-text'>Real Impact?</span> 🚀
                        </h2>
                        <p className='text-lg mb-10 relative' style={{color: 'rgba(196,181,253,0.7)'}}>
                            Join thousands of problem solvers and developers building a better India together.
                        </p>
                        <div className='flex items-center justify-center gap-4 relative'>
                            <button onClick={() => navigate('/signup')}
                                className='neon-btn px-10 py-4 rounded-xl text-lg'>
                                Post a Problem 📋
                            </button>
                            <button onClick={() => navigate('/signup')}
                                className='px-10 py-4 rounded-xl text-lg font-bold text-white transition-all hover:bg-white hover:bg-opacity-10'
                                style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                                Join as Developer 💻
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection