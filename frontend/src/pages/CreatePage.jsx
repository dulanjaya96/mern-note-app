import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'

const CreatePage = ({ user }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Show loading while user state is being determined
  if (user === undefined) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated (no redirect)
  if (user === null) {
    return (
      <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            
            
            <div className='card bg-base-100'>
              <div className='card-body text-center'>
                <h2 className='card-title text-2xl mb-4 justify-center'>Authentication Required</h2>
                <p className='mb-6'>You need to be logged in to create notes.</p>
                <div className='card-actions justify-center gap-4'>
                  <Link to="/login" className="btn btn-primary">
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-outline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required')
      return
    }
    setLoading(true)
    try {
      await api.post('/notes', {title, content})
      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Slow down! You are being rate limited.', {
          duration: 4000,
          icon: '🚨',
        })
      } else {
        toast.error('Failed to create note')
      }      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back to Notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create a New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Enter note title'
                    className='input input-bordered w-full '
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}                    
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    placeholder='Write note here...'
                    className='textarea textarea-bordered w-full'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows='6'
                  ></textarea>
                </div>

                <div className='card-actions justify-end'>
                  <button
                    type='submit'
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage