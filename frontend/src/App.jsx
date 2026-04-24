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
    element: <AdminDashboard />
  },
  {
    path: '*',
    element: (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold text-purple-600'>404</h1>
        <p className='text-gray-500 mt-2'>Page not found!</p>
        <a href='/' className='mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'>
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