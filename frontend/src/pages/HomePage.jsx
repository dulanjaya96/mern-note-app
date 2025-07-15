// HomePage.jsx
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/NotesNotFound.jsx'

import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const HomePage = ({ toggleTheme }) => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        console.log(res.data) 
        setNotes(res.data)
        setIsRateLimited(false) 
      } catch (error) {
        console.log('Error fetching notes:', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true) // Set rate limit status if 429 error
          }else {
          toast.error("Failed to load notes") 
        }
      } finally {
        setLoading(false) // Set loading to false after fetching 
      } 
      };
      fetchNotes();
      }, []);
  return (
  <div className="min-h-screen">
    <Navbar toggleTheme={toggleTheme} />

    {isRateLimited && <RateLimitedUI />} 

    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

      {notes.length === 0 && !isRateLimited && <NotesNotFound />}

      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  </div>
);

}

export default HomePage
