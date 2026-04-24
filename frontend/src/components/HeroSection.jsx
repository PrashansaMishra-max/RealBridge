import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/problemSlice'
import { useNavigate } from 'react-router-dom'
import { Search, Play } from 'lucide-react'

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
            <div className='relative overflow-hidden' style={{background: 'linear-gradient(135deg, #2d1b69 0%, #3730a3 40%, #4338ca 70%, #3b0764 100%)', minHeight: '100vh'}}>

                {/* Subtle dot pattern overlay */}
                <div className='absolute inset-0 pointer-events-none' style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    opacity: 0.4
                }}></div>

                {/* 3D Objects SVG - Right Side */}
                <div className='absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none'>
                    <svg viewBox="0 0 700 700" className='w-full h-full' style={{filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))'}}>
                        <defs>
                            {/* Purple gradients for 3D effect */}
                            <linearGradient id="cube1top" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#818cf8"/>
                                <stop offset="100%" stopColor="#4f46e5"/>
                            </linearGradient>
                            <linearGradient id="cube1left" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3730a3"/>
                                <stop offset="100%" stopColor="#4338ca"/>
                            </linearGradient>
                            <linearGradient id="cube1right" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6366f1"/>
                                <stop offset="100%" stopColor="#4f46e5"/>
                            </linearGradient>
                            <linearGradient id="cube2top" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a5b4fc"/>
                                <stop offset="100%" stopColor="#6366f1"/>
                            </linearGradient>
                            <linearGradient id="sphere1" cx="40%" cy="35%" r="60%" gradientUnits="objectBoundingBox">
                                <stop offset="0%" stopColor="#a5b4fc"/>
                                <stop offset="60%" stopColor="#6366f1"/>
                                <stop offset="100%" stopColor="#312e81"/>
                            </linearGradient>
                            <radialGradient id="sphere2" cx="40%" cy="35%" r="60%">
                                <stop offset="0%" stopColor="#c7d2fe"/>
                                <stop offset="50%" stopColor="#818cf8"/>
                                <stop offset="100%" stopColor="#3730a3"/>
                            </radialGradient>
                            <radialGradient id="sphere3" cx="40%" cy="35%" r="60%">
                                <stop offset="0%" stopColor="#e0e7ff"/>
                                <stop offset="50%" stopColor="#a5b4fc"/>
                                <stop offset="100%" stopColor="#4338ca"/>
                            </radialGradient>
                            <radialGradient id="sphere4" cx="40%" cy="35%" r="60%">
                                <stop offset="0%" stopColor="#818cf8"/>
                                <stop offset="60%" stopColor="#4338ca"/>
                                <stop offset="100%" stopColor="#1e1b4b"/>
                            </radialGradient>
                            <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1"/>
                                <stop offset="100%" stopColor="#3730a3"/>
                            </linearGradient>
                            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e1b4b"/>
                                <stop offset="100%" stopColor="#312e81"/>
                            </linearGradient>
                            <style>{`
                                @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-15px)} }
                                @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
                                @keyframes float3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-20px)} }
                                @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
                                .obj1{animation:float1 4s ease-in-out infinite}
                                .obj2{animation:float2 5s ease-in-out infinite 0.5s}
                                .obj3{animation:float3 3.5s ease-in-out infinite 1s}
                                .obj4{animation:float1 6s ease-in-out infinite 1.5s}
                                .obj5{animation:float2 4.5s ease-in-out infinite 0.8s}
                            `}</style>
                        </defs>

                        {/* Large Cube - center */}
                        <g className='obj1' transform="translate(200, 150)">
                            {/* Top face */}
                            <polygon points="120,0 240,70 120,140 0,70" fill="url(#cube1top)"/>
                            {/* Left face */}
                            <polygon points="0,70 120,140 120,280 0,210" fill="url(#cube1left)"/>
                            {/* Right face */}
                            <polygon points="120,140 240,70 240,210 120,280" fill="url(#cube1right)"/>
                        </g>

                        {/* Smaller Cube - top right */}
                        <g className='obj2' transform="translate(450, 80)">
                            <polygon points="70,0 140,40 70,80 0,40" fill="url(#cube2top)"/>
                            <polygon points="0,40 70,80 70,160 0,120" fill="url(#cube1left)"/>
                            <polygon points="70,80 140,40 140,120 70,160" fill="url(#cube1right)"/>
                        </g>

                        {/* Dark small cube - bottom */}
                        <g className='obj3' transform="translate(350, 480)">
                            <polygon points="55,0 110,32 55,63 0,32" fill="#4338ca"/>
                            <polygon points="0,32 55,63 55,125 0,95" fill="#1e1b4b"/>
                            <polygon points="55,63 110,32 110,95 55,125" fill="#312e81"/>
                        </g>

                        {/* Large sphere - bottom right */}
                        <g className='obj4'>
                            <circle cx="530" cy="480" r="100" fill="url(#sphere2)"/>
                            {/* Stripe lines for 3D sphere effect */}
                            <ellipse cx="530" cy="480" rx="100" ry="30" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5"/>
                            <ellipse cx="530" cy="460" rx="95" ry="20" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.4"/>
                            <ellipse cx="530" cy="500" rx="95" ry="20" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.4"/>
                            <line x1="530" y1="380" x2="530" y2="580" stroke="#6366f1" strokeWidth="1.5" opacity="0.4"/>
                            <line x1="440" y1="450" x2="620" y2="510" stroke="#6366f1" strokeWidth="1" opacity="0.3"/>
                        </g>

                        {/* Small sphere top */}
                        <g className='obj5'>
                            <circle cx="460" cy="120" r="45" fill="url(#sphere3)"/>
                            <ellipse cx="460" cy="120" rx="45" ry="15" fill="none" stroke="#a5b4fc" strokeWidth="1" opacity="0.5"/>
                        </g>

                        {/* Tiny sphere left */}
                        <g className='obj2'>
                            <circle cx="190" cy="480" r="30" fill="url(#sphere4)"/>
                        </g>

                        {/* Tiny sphere top-far-right */}
                        <g className='obj3'>
                            <circle cx="580" cy="200" r="22" fill="url(#sphere1)"/>
                        </g>

                        {/* Ring / Torus - bottom left */}
                        <g className='obj1' transform="translate(100, 370)">
                            <ellipse cx="80" cy="80" rx="80" ry="35" fill="none" stroke="url(#ring1)" strokeWidth="22" opacity="0.9"/>
                            <ellipse cx="80" cy="80" rx="80" ry="35" fill="none" stroke="#6366f1" strokeWidth="18" opacity="0.6"/>
                            <ellipse cx="80" cy="65" rx="75" ry="25" fill="none" stroke="#818cf8" strokeWidth="8" opacity="0.4"/>
                        </g>

                        {/* Hexagon - dark, top area */}
                        <g className='obj4' transform="translate(490, 280)">
                            <polygon points="50,0 100,28 100,85 50,113 0,85 0,28" fill="url(#hexGrad)" opacity="0.9"/>
                            <polygon points="50,10 90,32 90,78 50,100 10,78 10,32" fill="#1e1b4b" opacity="0.5"/>
                        </g>

                        {/* Shadow/ground reflection */}
                        <ellipse cx="350" cy="650" rx="250" ry="25" fill="rgba(0,0,0,0.3)"/>
                    </svg>
                </div>

                {/* Left side content */}
                <div className='relative max-w-7xl mx-auto px-4 flex items-center' style={{minHeight: '100vh'}}>
                    <div className='w-1/2 py-20'>

                        {/* Tag */}
                        <p className='text-xs font-bold tracking-widest uppercase mb-6' style={{color: '#a5b4fc'}}>
                            India's First Problem-Developer Bridge
                        </p>

                        {/* Heading */}
                        <h1 className='font-black leading-none mb-4 text-white' style={{fontSize: '68px', letterSpacing: '-2px'}}>
                            Real World<br/>
                            <span style={{color: '#c7d2fe'}}>Problems</span><br/>
                            <span style={{backgroundImage: 'linear-gradient(90deg, #a5b4fc, #e0e7ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                Meet Developers
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className='font-bold uppercase tracking-widest mb-6 text-sm' style={{color: '#818cf8'}}>
                            Community Driven Platform
                        </p>

                        <p className='text-base mb-10 max-w-md leading-relaxed' style={{color: 'rgba(199,210,254,0.8)'}}>
                            A new way to connect everyday people with talented developers and students
                            who turn real-world problems into working solutions.
                        </p>

                        {/* Search bar */}
                        <div className='flex items-center rounded-full overflow-hidden mb-8 max-w-lg'
                            style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(165,180,252,0.3)'}}>
                            <Search className='w-5 h-5 ml-5 flex-shrink-0' style={{color: '#a5b4fc'}}/>
                            <input type="text"
                                placeholder='Search problems...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                                className='outline-none border-none w-full py-4 px-3 bg-transparent text-white placeholder-indigo-300'
                            />
                        </div>

                        {/* Buttons */}
                        <div className='flex items-center gap-4'>
                            <button onClick={() => navigate('/signup')}
                                className='px-8 py-4 rounded-full font-bold text-white hover:opacity-90 transition-all'
                                style={{background: '#1e1b4b', fontSize: '15px'}}>
                                Get Started
                            </button>
                            <button onClick={() => navigate('/problems')}
                                className='flex items-center gap-3 px-6 py-4 rounded-full font-bold transition-all hover:opacity-80'
                                style={{color: '#c7d2fe', background: 'transparent'}}>
                                <div className='w-10 h-10 rounded-full flex items-center justify-center'
                                    style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(165,180,252,0.4)'}}>
                                    <Play className='w-4 h-4 text-white' style={{marginLeft: '2px'}}/>
                                </div>
                                Browse Problems
                            </button>
                        </div>

                        {/* Stats */}
                        <div className='flex items-center gap-10 mt-14'>
                            {[
                                { value: '500+', label: 'Problems Posted' },
                                { value: '1,200+', label: 'Developers' },
                                { value: '300+', label: 'Solutions' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <h2 className='font-black text-white text-2xl'>{stat.value}</h2>
                                    <p className='text-xs mt-1' style={{color: '#818cf8'}}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className='py-24' style={{background: '#1e1b4b'}}>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='font-black text-white mt-4 mb-4' style={{fontSize: '40px'}}>How RealBridge Works</h2>
                        <p style={{color: 'rgba(165,180,252,0.7)'}}>Three simple steps to connect problems with solutions</p>
                    </div>
                    <div className='grid grid-cols-3 gap-8'>
                        {[
                            { step: '01', title: 'Post Your Problem', desc: 'Describe your real-world challenge. No technical knowledge needed.', color: '#6366f1' },
                            { step: '02', title: 'Get Matched', desc: 'Smart matching connects your problem with the right developer.', color: '#818cf8' },
                            { step: '03', title: 'Receive Solution', desc: 'Track progress and get a real working solution delivered.', color: '#a5b4fc' }
                        ].map(item => (
                            <div key={item.step} className='rounded-3xl p-8 hover:-translate-y-1 transition-all'
                                style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(165,180,252,0.2)'}}>
                                <div className='w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white mb-6'
                                    style={{background: item.color}}>
                                    {item.step}
                                </div>
                                <h3 className='text-xl font-black text-white mb-3'>{item.title}</h3>
                                <p style={{color: 'rgba(165,180,252,0.7)'}}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CATEGORIES */}
            <div className='py-24' style={{background: '#2d1b69'}}>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='font-black text-white mt-4 mb-4' style={{fontSize: '40px'}}>Problem Categories</h2>
                        <p style={{color: 'rgba(165,180,252,0.7)'}}>Browse problems across different domains</p>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {[
                            { name: 'Agriculture', emoji: '🌾' },
                            { name: 'Healthcare', emoji: '🏥' },
                            { name: 'Education', emoji: '📚' },
                            { name: 'Environment', emoji: '🌍' },
                            { name: 'Technology', emoji: '💻' },
                            { name: 'Business', emoji: '💼' },
                            { name: 'Social', emoji: '🤝' },
                            { name: 'Other', emoji: '✨' },
                        ].map(cat => (
                            <button key={cat.name}
                                onClick={() => { dispatch(setSearchedQuery(cat.name)); navigate("/problems"); }}
                                className='rounded-3xl p-6 text-center transition-all hover:scale-105 hover:-translate-y-1'
                                style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(165,180,252,0.2)'}}>
                                <div className='text-4xl mb-3'>{cat.emoji}</div>
                                <p className='font-bold text-white'>{cat.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className='py-24' style={{background: '#1e1b4b'}}>
                <div className='max-w-4xl mx-auto px-4 text-center'>
                    <div className='rounded-3xl p-16'
                        style={{background: 'linear-gradient(135deg, #3730a3, #4338ca, #3b0764)', border: '1px solid rgba(165,180,252,0.3)'}}>
                        <h2 className='font-black text-white mb-4' style={{fontSize: '48px'}}>
                            Ready to Make an Impact? 🚀
                        </h2>
                        <p className='text-lg mb-10' style={{color: 'rgba(199,210,254,0.8)'}}>
                            Join thousands of problem solvers and developers building a better India.
                        </p>
                        <div className='flex items-center justify-center gap-4'>
                            <button onClick={() => navigate('/signup')}
                                className='px-8 py-4 font-black rounded-full text-white hover:opacity-90 transition-all'
                                style={{background: '#1e1b4b'}}>
                                Post a Problem 📋
                            </button>
                            <button onClick={() => navigate('/signup')}
                                className='px-8 py-4 font-black rounded-full transition-all text-white'
                                style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)'}}>
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