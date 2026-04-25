import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Problems from './components/problems/Problems'
import PostProblem from './components/problems/PostProblem'
import Profile from './components/Profile'
import ProblemDetail from './components/problems/ProblemDetail'
import CitizenDashboard from './components/dashboard/CitizenDashboard'
import DeveloperDashboard from './components/dashboard/DeveloperDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/problems',
    element: <Problems />
  },
  {
    path: '/problems/:id',
    element: <ProblemDetail />
  },
  {
    path: '/post-problem',
    element: <PostProblem />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/dashboard/citizen',
    element: <CitizenDashboard />
  },
  {
    path: '/dashboard/developer',
    element: <DeveloperDashboard />
  },
  {
    path: '/dashboard/admin',
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    )
  },
  {
    path: '*',
    element: (
      <div className='flex flex-col items-center justify-center h-screen'
        style={{background: '#0B0F19'}}>
        <h1 className='text-6xl font-black gradient-text'>404</h1>
        <p className='mt-4 mb-8' style={{color: 'rgba(196,181,253,0.7)'}}>Page not found!</p>
        <a href='/' className='neon-btn px-8 py-3 rounded-xl'>
          Go Home
        </a>
      </div>
    )
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App