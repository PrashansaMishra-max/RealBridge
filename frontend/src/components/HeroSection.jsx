import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/problemSlice'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Zap, Star, Globe, Code, Heart, Leaf } from 'lucide-react'

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
            {/* HERO SECTION */}
            <div className='relative overflow-hidden' style={{background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'}}>

                {/* Floating Blobs */}
                <div className='absolute top-10 left-10 w-72 h-72 rounded-full opacity-20' style={{background: 'radial-gradient(circle, #a855f7, transparent)'}}></div>
                <div className='absolute top-20 right-20 w-96 h-96 rounded-full opacity-20' style={{background: 'radial-gradient(circle, #6366f1, transparent)'}}></div>
                <div className='absolute bottom-10 left-1/2 w-64 h-64 rounded-full opacity-10' style={{background: 'radial-gradient(circle, #ec4899, transparent)'}}></div>

                <div className='relative max-w-7xl mx-auto px-4 py-28 flex flex-col items-center text-center'>

                    {/* Badge */}
                    <div className='flex items-center gap-2 px-5 py-2 rounded-full mb-8 border border-purple-400 border-opacity-40' style={{background: 'rgba(168, 85, 247, 0.15)'}}>
                        <Zap className='w-4 h-4 text-yellow-400' />
                        <span className='text-purple-200 text-sm font-semibold'>India's First Problem-Developer Bridge 🇮🇳</span>
                    </div>

                    {/* Heading */}
                    <h1 className='text-7xl font-black leading-tight mb-6 max-w-5xl'>
                        <span className='text-white'>Real Problems.</span>
                        <br />
                        <span style={{backgroundImage: 'linear-gradient(90deg, #a855f7, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                            Real Solutions.
                        </span>
                        <br />
                        <span className='text-white'>Real </span>
                        <span style={{backgroundImage: 'linear-gradient(90deg, #facc15, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                            Impact.
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className='text-xl text-purple-200 mb-10 max-w-2xl leading-relaxed'>
                        Connect your everyday challenges with talented developers and students
                        who build <span className='text-yellow-400 font-semibold'>real solutions</span> — not just another clone project.
                    </p>

                    {/* Search Bar */}
                    <div className='flex w-full max-w-2xl items-center bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl overflow-hidden mb-6 backdrop-blur-sm focus-within:border-purple-400 transition-all'>
                        <Search className='w-5 h-5 text-purple-300 ml-4 flex-shrink-0' />
                        <input
                            type="text"
                            placeholder='Search problems by keyword, category or skill...'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                            className='outline-none border-none w-full py-4 px-3 text-white placeholder-purple-300 bg-transparent'
                        />
                        <button
                            onClick={searchHandler}
                            className='flex items-center gap-2 px-6 py-3 font-bold m-2 rounded-xl transition-all hover:opacity-90 text-white'
                            style={{backgroundImage: 'linear-gradient(135deg, #a855f7, #6366f1)'}}
                        >
                            Search <ArrowRight className='w-4 h-4' />
                        </button>
                    </div>

                    {/* Popular Tags */}
                    <div className='flex items-center gap-2 flex-wrap justify-center mb-16'>
                        <span className='text-sm text-purple-400'>Trending:</span>
                        {['Agriculture', 'Healthcare', 'Education', 'Mobile App', 'Website'].map((tag, i) => (
                            <button
                                key={tag}
                                onClick={() => { dispatch(setSearchedQuery(tag)); navigate("/problems"); }}
                                className='px-3 py-1 text-sm rounded-full transition-all border border-opacity-30 text-purple-200 hover:text-white border-purple-400'
                                style={{background: 'rgba(168, 85, 247, 0.15)'}}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-16'>
                        {[
                            { value: '500+', label: 'Problems Posted', color: 'text-purple-400' },
                            { value: '1,200+', label: 'Developers & Students', color: 'text-pink-400' },
                            { value: '300+', label: 'Solutions Delivered', color: 'text-yellow-400' },
                        ].map((stat) => (
                            <div key={stat.label} className='text-center'>
                                <h2 className={`text-5xl font-black ${stat.color}`}>{stat.value}</h2>
                                <p className='text-purple-300 text-sm mt-2'>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className='py-24' style={{background: 'linear-gradient(180deg, #faf5ff, #ffffff)'}}>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <span className='px-4 py-2 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full'>Simple Process</span>
                        <h2 className='text-4xl font-black text-gray-900 mt-4 mb-4'>How RealBridge Works</h2>
                        <p className='text-gray-500 text-lg max-w-xl mx-auto'>Three simple steps to connect problems with solutions</p>
                    </div>

                    <div className='grid grid-cols-3 gap-8'>
                        {[
                            {
                                step: '01',
                                title: 'Post Your Problem',
                                desc: 'Describe your real-world challenge. Anyone can post — no technical knowledge needed.',
                                gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                                bg: 'bg-purple-50',
                                border: 'border-purple-100'
                            },
                            {
                                step: '02',
                                title: 'Get Matched',
                                desc: 'Our smart matching connects your problem with the right developer or student.',
                                gradient: 'linear-gradient(135deg, #6366f1, #4338ca)',
                                bg: 'bg-indigo-50',
                                border: 'border-indigo-100'
                            },
                            {
                                step: '03',
                                title: 'Receive Solution',
                                desc: 'Track progress, collaborate, and get a real working solution delivered.',
                                gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
                                bg: 'bg-pink-50',
                                border: 'border-pink-100'
                            }
                        ].map((item) => (
                            <div key={item.step} className={`${item.bg} border ${item.border} rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1`}>
                                <div className='w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white mb-6' style={{backgroundImage: item.gradient}}>
                                    {item.step}
                                </div>
                                <h3 className='text-xl font-black text-gray-900 mb-3'>{item.title}</h3>
                                <p className='text-gray-500 leading-relaxed'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CATEGORIES */}
            <div className='py-24 bg-white'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <span className='px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full'>Explore</span>
                        <h2 className='text-4xl font-black text-gray-900 mt-4 mb-4'>Problem Categories</h2>
                        <p className='text-gray-500 text-lg'>Browse problems across different domains</p>
                    </div>

                    <div className='grid grid-cols-4 gap-4'>
                        {[
                            { name: 'Agriculture', emoji: '🌾', gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', text: 'text-green-700' },
                            { name: 'Healthcare', emoji: '🏥', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)', text: 'text-red-700' },
                            { name: 'Education', emoji: '📚', gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', text: 'text-blue-700' },
                            { name: 'Environment', emoji: '🌍', gradient: 'linear-gradient(135deg, #ccfbf1, #99f6e4)', text: 'text-teal-700' },
                            { name: 'Technology', emoji: '💻', gradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', text: 'text-purple-700' },
                            { name: 'Business', emoji: '💼', gradient: 'linear-gradient(135deg, #fef9c3, #fef08a)', text: 'text-yellow-700' },
                            { name: 'Social', emoji: '🤝', gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', text: 'text-pink-700' },
                            { name: 'Other', emoji: '✨', gradient: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)', text: 'text-gray-700' },
                        ].map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => { dispatch(setSearchedQuery(cat.name)); navigate("/problems"); }}
                                className='rounded-3xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg cursor-pointer'
                                style={{backgroundImage: cat.gradient}}
                            >
                                <div className='text-4xl mb-3'>{cat.emoji}</div>
                                <p className={`font-bold ${cat.text}`}>{cat.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* WHY REALBRIDGE */}
            <div className='py-24' style={{background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e1b4b)'}}>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-black text-white mb-4'>Why RealBridge?</h2>
                        <p className='text-indigo-300 text-lg'>We're different from every other platform out there</p>
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        {[
                            { icon: '🚀', title: 'Real World Experience', desc: 'Developers get actual projects to work on instead of building the 100th todo app.', color: 'border-purple-500' },
                            { icon: '🌉', title: 'Bridge The Gap', desc: 'Common people finally have a way to bring their problems to technical minds.', color: 'border-pink-500' },
                            { icon: '🏆', title: 'Build Your Portfolio', desc: 'Every solution becomes a verified portfolio piece that impresses employers.', color: 'border-yellow-500' },
                            { icon: '🤝', title: 'Community Driven', desc: 'A supportive community of problem solvers working together for real impact.', color: 'border-green-500' },
                        ].map((item) => (
                            <div key={item.title} className={`bg-white bg-opacity-5 border ${item.color} border-opacity-40 rounded-3xl p-8 backdrop-blur-sm hover:bg-opacity-10 transition-all`}>
                                <div className='text-4xl mb-4'>{item.icon}</div>
                                <h3 className='text-xl font-black text-white mb-3'>{item.title}</h3>
                                <p className='text-indigo-300 leading-relaxed'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className='py-24 bg-white'>
                <div className='max-w-4xl mx-auto px-4 text-center'>
                    <div className='rounded-3xl p-16' style={{backgroundImage: 'linear-gradient(135deg, #7c3aed, #6366f1, #ec4899)'}}>
                        <h2 className='text-5xl font-black text-white mb-4'>
                            Ready to Make an Impact? 🚀
                        </h2>
                        <p className='text-purple-100 text-lg mb-10 max-w-xl mx-auto'>
                            Join thousands of problem solvers and developers building a better India together.
                        </p>
                        <div className='flex items-center justify-center gap-4'>
                            <button
                                onClick={() => navigate('/signup')}
                                className='px-8 py-4 bg-white font-black rounded-2xl hover:bg-purple-50 transition-all text-transparent bg-clip-text'
                                style={{color: '#7c3aed'}}
                            >
                                Post a Problem 📋
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className='px-8 py-4 font-black rounded-2xl border-2 border-white text-white hover:bg-white hover:text-purple-700 transition-all'
                            >
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