import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Users, FileText, CheckCircle, Clock } from 'lucide-react'

const AdminDashboard = () => {
    const { user } = useSelector(store => store.auth);
    const { allProblems } = useSelector(store => store.problem);
    const navigate = useNavigate();

    const openProblems = allProblems.filter(p => p.status === 'open');
    const inProgressProblems = allProblems.filter(p => p.status === 'in-progress');
    const solvedProblems = allProblems.filter(p => p.status === 'solved');

    const categories = ['Technology', 'Health', 'Education', 'Agriculture', 'Environment', 'Business', 'Social', 'Other'];
    const categoryStats = categories.map(cat => ({
        name: cat,
        count: allProblems.filter(p => p.category === cat).length
    }));

    return (
        <div className='page-wrapper'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-6 py-12'>

                {/* Header */}
                <div className='mb-10'>
                    <div className='flex items-center gap-3 mb-2'>
                        <span className='text-3xl'>👑</span>
                        <h1 className='text-4xl font-black text-white'>
                            Admin <span className='gradient-text'>Dashboard</span>
                        </h1>
                    </div>
                    <p style={{color: 'rgba(196,181,253,0.6)'}}>
                        Monitor platform activity and manage users.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-4 gap-6 mb-10'>
                    {[
                        { label: 'Total Problems', value: allProblems.length, icon: <FileText className='w-6 h-6'/>, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)' },
                        { label: 'Open', value: openProblems.length, icon: <Clock className='w-6 h-6'/>, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
                        { label: 'In Progress', value: inProgressProblems.length, icon: <Users className='w-6 h-6'/>, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
                        { label: 'Solved', value: solvedProblems.length, icon: <CheckCircle className='w-6 h-6'/>, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
                    ].map(stat => (
                        <div key={stat.label} className='rounded-2xl p-6 text-center'
                            style={{background: stat.bg, border: `1px solid ${stat.border}`}}>
                            <div className='flex items-center justify-center mb-3' style={{color: stat.color}}>
                                {stat.icon}
                            </div>
                            <h2 className='text-4xl font-black mb-1' style={{color: stat.color}}>{stat.value}</h2>
                            <p className='text-sm' style={{color: 'rgba(196,181,253,0.6)'}}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-2 gap-8'>

                    {/* Category Stats */}
                    <div className='glass-card p-6'>
                        <h2 className='text-xl font-black text-white mb-6'>📊 Problems by Category</h2>
                        <div className='flex flex-col gap-4'>
                            {categoryStats.map((cat) => (
                                <div key={cat.name} className='flex items-center gap-3'>
                                    <span className='text-sm w-24' style={{color: 'rgba(196,181,253,0.7)'}}>{cat.name}</span>
                                    <div className='flex-1 rounded-full h-2' style={{background: 'rgba(255,255,255,0.08)'}}>
                                        <div className='h-2 rounded-full'
                                            style={{
                                                width: allProblems.length > 0 ? `${(cat.count / allProblems.length) * 100}%` : '0%',
                                                background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)'
                                            }}
                                        />
                                    </div>
                                    <span className='text-sm font-bold w-4 text-white'>{cat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Problems */}
                    <div className='glass-card p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-xl font-black text-white'>🕐 Recent Problems</h2>
                            <button onClick={() => navigate('/problems')}
                                className='text-sm font-medium hover:text-white transition-colors'
                                style={{color: '#8b5cf6'}}>
                                View All →
                            </button>
                        </div>
                        {allProblems.length === 0 ? (
                            <div className='text-center py-10'>
                                <p style={{color: 'rgba(196,181,253,0.5)'}}>No problems posted yet.</p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3'>
                                {allProblems.slice(0, 6).map((problem) => (
                                    <div key={problem._id}
                                        className='flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all hover:bg-white hover:bg-opacity-5'
                                        style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'}}
                                        onClick={() => navigate(`/problems/${problem._id}`)}>
                                        <div>
                                            <p className='font-medium text-sm text-white'>{problem.title}</p>
                                            <p className='text-xs mt-1' style={{color: 'rgba(196,181,253,0.5)'}}>{problem.category}</p>
                                        </div>
                                        <span className='px-2 py-1 rounded-full text-xs font-bold'
                                            style={{
                                                background: problem.status === 'open' ? 'rgba(6,182,212,0.15)' :
                                                problem.status === 'in-progress' ? 'rgba(245,158,11,0.15)' :
                                                'rgba(16,185,129,0.15)',
                                                color: problem.status === 'open' ? '#06b6d4' :
                                                problem.status === 'in-progress' ? '#f59e0b' : '#10b981'
                                            }}>
                                            {problem.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='mt-8 glass-card p-6'>
                    <h2 className='text-xl font-black text-white mb-6'>⚡ Quick Actions</h2>
                    <div className='grid grid-cols-4 gap-4'>
                        {[
                            { label: 'View All Problems', icon: '📋', action: () => navigate('/problems'), color: '#8b5cf6' },
                            { label: 'View All Users', icon: '👥', action: () => navigate('/dashboard/admin'), color: '#06b6d4' },
                            { label: 'Post a Problem', icon: '➕', action: () => navigate('/post-problem'), color: '#10b981' },
                            { label: 'View Reports', icon: '📊', action: () => navigate('/dashboard/admin'), color: '#f59e0b' },
                        ].map(item => (
                            <button key={item.label}
                                onClick={item.action}
                                className='p-4 rounded-2xl text-center transition-all hover:-translate-y-1'
                                style={{background: `${item.color}15`, border: `1px solid ${item.color}30`}}>
                                <div className='text-3xl mb-2'>{item.icon}</div>
                                <p className='text-sm font-bold text-white'>{item.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard